const CACHE_KEY = 'aloha:regulatory:v3'
const CACHE_TTL = 60 * 60 * 6

async function redisGet(key) {
  try {
    const r = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/${key}`, { headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` } })
    const d = await r.json()
    return d.result ? JSON.parse(d.result) : null
  } catch { return null }
}

async function redisSet(key, value, ttl) {
  try {
    await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${key}`, { method: 'POST', headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify([JSON.stringify(value), 'EX', ttl]) })
  } catch {}
}

function parseRSS(xml, keywords = []) {
  const items = []
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)
  for (const m of itemMatches) {
    const block = m[1]
    const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || block.match(/<title>(.*?)<\/title>/))?.[1]?.trim()
    const link = block.match(/<link>(.*?)<\/link>/)?.[1]?.trim()
    const date = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim()
    const desc = (block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || block.match(/<description>(.*?)<\/description>/))?.[1]?.trim()
    if (!title) continue
    if (keywords.length === 0 || keywords.some(kw => title.toLowerCase().includes(kw) || desc?.toLowerCase().includes(kw))) {
      items.push({ title, link, date, description: desc?.replace(/<[^>]+>/g, '').slice(0, 200) })
    }
  }
  return items.slice(0, 6)
}

async function fetchFTC() {
  try {
    const r = await fetch('https://www.ftc.gov/feeds/press-release.xml', { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AlohaAIConsulting/1.0)' } })
    if (!r.ok) return []
    const xml = await r.text()
    return parseRSS(xml, ['ai', 'artificial intelligence', 'influencer', 'disclosure', 'endorsement', 'deepfake', 'synthetic', 'creator', 'technology', 'data'])
  } catch { return [] }
}

async function fetchAILegislation() {
  try {
    const query = encodeURIComponent('artificial intelligence bill Congress 2026 deepfake synthetic media creator rights')
    const r = await fetch(`https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AlohaAIConsulting/1.0)' } })
    if (!r.ok) return []
    const xml = await r.text()
    return parseRSS(xml)
  } catch { return [] }
}

async function fetchFederalRegister() {
  try {
    const r = await fetch('https://www.federalregister.gov/api/v1/articles.json?conditions[term]=artificial+intelligence&conditions[agencies][]=federal-trade-commission&order=newest&per_page=5&fields[]=title&fields[]=publication_date&fields[]=abstract&fields[]=html_url', { headers: { 'User-Agent': 'AlohaAIConsulting/1.0' } })
    if (!r.ok) return []
    const d = await r.json()
    return (d.results || []).slice(0, 5).map(item => ({ title: item.title, date: item.publication_date, link: item.html_url, description: item.abstract?.slice(0, 200) }))
  } catch { return [] }
}

export default async function handler(req, res) {
  const forceRefresh = req.query.refresh === '1'
  if (!forceRefresh) {
    const cached = await redisGet(CACHE_KEY)
    if (cached) return res.status(200).json(cached)
  }
  const [ftc, congress, fedReg] = await Promise.allSettled([fetchFTC(), fetchAILegislation(), fetchFederalRegister()])
  const payload = { ftc: ftc.status === 'fulfilled' ? ftc.value : [], congress: congress.status === 'fulfilled' ? congress.value : [], federalRegister: fedReg.status === 'fulfilled' ? fedReg.value : [], fetchedAt: new Date().toISOString() }
  await redisSet(CACHE_KEY, payload, CACHE_TTL)
  return res.status(200).json(payload)
}
