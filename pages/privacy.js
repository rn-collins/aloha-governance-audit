import Head from 'next/head'
const U='https://aloha-governance-audit.vercel.app'
export default function Privacy(){return <><Head>
 <title>Privacy — Campaign Governance Issue-Spotter</title>
 <meta name="description" content="Where the checklist's data goes: industry, description and selections stay in the open browser tab, no cookies are set, and measurement is limited to cookieless page views and Core Web Vitals."/>
 <meta name="robots" content="index, follow"/>
 <link rel="canonical" href={U+'/privacy'}/>
 <meta property="og:title" content="Privacy — Campaign Governance Issue-Spotter"/>
 <meta property="og:description" content="Checklist entries stay in the browser tab. No cookies, no form, no server-side campaign storage."/>
 <meta property="og:type" content="article"/>
 <meta property="og:url" content={U+'/privacy'}/>
 <meta property="og:image" content={U+'/og.png'}/>
 <meta property="og:image:width" content="1200"/>
 <meta property="og:image:height" content="630"/>
 <meta property="og:image:alt" content="Campaign Governance Issue-Spotter — eight activation types, each returning a review question at Immediate, Focused or Baseline attention."/>
 <meta name="twitter:card" content="summary_large_image"/>
 <meta name="twitter:image" content={U+'/og.png'}/>
</Head><main><a href="/">← Back to checklist</a><h1>Privacy</h1>
<p><strong>Last reviewed:</strong> 19 August 2026</p>
<p className="lead">The checklist runs entirely in your browser. That single design decision settles most of what a privacy notice normally has to explain, and the rest of this page says exactly what it leaves.</p>

<h2>What happens to what you type</h2>
<p>The industry you pick, the campaign description you write, the activation types you tick, and the review areas that come back all live in the page’s own memory in the open tab. They travel to no server, are written to no cookie or local storage, and are attached to no identifier. Closing or refreshing the tab clears them, and the “Clear and start over” button clears them immediately. Because the description field never leaves your machine, a campaign that has yet to be announced stays as confidential as the device you are reading this on. Even so, the field is capped at 300 characters and asks for non-confidential context, because a habit of pasting briefs into web forms is worth breaking regardless of where any single form sends them.</p>

<h2>Hosting and measurement</h2>
<p>The site is hosted on Vercel. Ordinary request data — IP address, user agent, requested path, and timestamp — is processed to serve the page, secure it, and keep it available. Two first-party scripts load from this domain: Vercel Web Analytics, which counts page views without cookies and without following visitors between sites, and Vercel Speed Insights, which reports loading and interaction timing. Both produce aggregate numbers about the site. Neither is configured with a user identifier, and neither can see the checklist fields, which are never submitted.</p>
<p>Every response carries a Content-Security-Policy confining the page to its own origin, with one exception for performance measurements posted to <code>vitals.vercel-insights.com</code>. Scripts, styles, fonts, and images all resolve to this domain, so opening the checklist contacts no advertising network, font host, tag manager, or social platform.</p>

<h2>Cookies</h2>
<p>This site sets no cookies, which is why you were never shown a consent banner.</p>

<h2>Contact, and links away</h2>
<p>The site links to email and LinkedIn rather than embedding a form, so nothing you write passes through this domain on its way to me. Mail reaches a Northeastern University mailbox under that provider’s terms and retention schedule. Please keep confidential, privileged, and client-identifying material out of those channels. The source links point to eCFR, the U.S. Copyright Office, California and Tennessee legislature sites, and EUR-Lex; once you follow one, that destination’s own policy applies. A Referrer-Policy of <code>strict-origin-when-cross-origin</code> tells those sites only that a visitor arrived from this origin.</p>

<h2>Access, correction, and deletion</h2>
<p>Because the checklist stores nothing about you, there is no record to export, amend, or erase. Questions about this notice go to <a href="mailto:collins.ra@northeastern.edu">collins.ra@northeastern.edu</a>. Any material change to what the site processes updates the reviewed date above, so that date reliably marks when these statements were last checked against the deployed build.</p>
</main><style jsx>{`main{width:min(720px,calc(100% - 40px));margin:60px auto 100px;line-height:1.75}h1{font-size:42px;margin:24px 0}h2{margin-top:34px;font-size:24px}p{color:#5A5857}.lead{font-size:19px;color:#1C1B1F}code{background:#E8F5F2;border-radius:4px;padding:1px 5px;font-size:14px}a{color:#0F5E50}`}</style></>}
