// /pages/api/regulatory.js
// Sources: FTC enforcement RSS + Congress.gov AI bills RSS + Federal Register JSON
// Cache: Upstash Redis REST, 6hr TTL — shared key prefix with other tools

const CACHE_KEY = 'aloha:regulatory:v2'
const CACHE_TTL = 60 * 60 * 6

async function redisGet(key) {
  try {
    const r = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` }
    })
    const d = await r.json()
    return d.result ? JSON.parse(d.result) : null
  } catch { return null }
}

async function redisSet(key, value, ttl) {
  try {
    await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${key}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([JSON.stringify(value), 'EX', ttl])
    })
  } catch {}
}

function parseRSS(xml) {
  const items = []
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)
  for (const m of itemMatches) {
    const block = m[1]
    const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || block.match(/<title>(.*?)<\/title>/))?.[1]?.trim()
    const link = (block.match(/<link>(.*?)<\/link>/))?.[1]?.trim()
    const date = (block.match(/<pubDate>(.*?)<\/pubDate>/))?.[1]?.trim()
    const desc = (block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || block.match(/<description>(.*?)<\/description>/))?.[1]?.trim()
    if (title) items.push({ title, link, date, description: desc?.slice(0, 200) })
  }
  return items.slice(0, 8)
}

async function fetchFTC() {
  try {
    const r = await fetch('https://www.ftc.gov/feeds/press-releases.xml', {
      headers: { 'User-Agent': 'AlohaAIConsulting/1.0' }
    })
    if (!r.ok) return []
    const xml = await r.text()
    const all = parseRSS(xml)
    // Filter for AI, influencer, disclosure, synthetic relevant items
    const keywords = ['ai', 'artificial intelligence', 'influencer', 'disclosure', 'endorsement', 'deepfake', 'synthetic', 'creator']
    return all.filter(item =>
      keywords.some(kw =>
        item.title?.toLowerCase().includes(kw) ||
        item.description?.toLowerCase().includes(kw)
      )
    ).slice(0, 5)
  } catch { return [] }
}

async function fetchCongress() {
  try {
    const r = await fetch('https://www.congress.gov/rss/legislation.xml', {
      headers: { 'User-Agent': 'AlohaAIConsulting/1.0' }
    })
    if (!r.ok) return []
    const xml = await r.text()
    const all = parseRSS(xml)
    const keywords = ['artificial intelligence', 'ai act', 'deepfake', 'synthetic media', 'no fakes', 'likeness', 'influencer', 'creator']
    return all.filter(item =>
      keywords.some(kw =>
        item.title?.toLowerCase().includes(kw) ||
        item.description?.toLowerCase().includes(kw)
      )
    ).slice(0, 5)
  } catch { return [] }
}

async function fetchFederalRegister() {
  try {
    const url = 'https://www.federalregister.gov/api/v1/articles.json?conditions[term]=artificial+intelligence&conditions[agencies][]=federal-trade-commission&conditions[agencies][]=copyright-office&order=newest&per_page=5&fields[]=title&fields[]=publication_date&fields[]=abstract&fields[]=html_url&fields[]=document_number'
    const r = await fetch(url, { headers: { 'User-Agent': 'AlohaAIConsulting/1.0' } })
    if (!r.ok) return []
    const d = await r.json()
    return (d.results || []).slice(0, 5).map(item => ({
      title: item.title,
      date: item.publication_date,
      link: item.html_url,
      description: item.abstract?.slice(0, 200)
    }))
  } catch { return [] }
}

export default async function handler(req, res) {
  const forceRefresh = req.query.refresh === '1'

  if (!forceRefresh) {
    const cached = await redisGet(CACHE_KEY)
    if (cached) return res.status(200).json(cached)
  }

  const [ftc, congress, fedReg] = await Promise.allSettled([
    fetchFTC(), fetchCongress(), fetchFederalRegister()
  ])

  const payload = {
    ftc: ftc.status === 'fulfilled' ? ftc.value : [],
    congress: congress.status === 'fulfilled' ? congress.value : [],
    federalRegister: fedReg.status === 'fulfilled' ? fedReg.value : [],
    fetchedAt: new Date().toISOString()
  }

  await redisSet(CACHE_KEY, payload, CACHE_TTL)
  return res.status(200).json(payload)
}
