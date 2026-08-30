import Head from 'next/head'
const U='https://aloha-governance-audit.vercel.app'
const links=[
['16 CFR Part 255 — Endorsement Guides','https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255','Operative FTC guidance','Operative FTC guidance on endorsements and material connections.'],
['16 CFR Part 465 — Reviews and Testimonials','https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-465','Operative federal rule','Operative federal rule addressing specified deceptive reviews and testimonials.'],
['FTC — Consumer Reviews and Testimonials Rule Q&A','https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers','Official staff guidance','Official staff guidance on the rule’s application.'],
['FTC — Endorsements, Influencers, and Reviews','https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews','Official business guidance','Official FTC business guidance; relevant to endorsements and material connections.'],
['U.S. Copyright Office — Copyright and Artificial Intelligence','https://www.copyright.gov/ai/','Official agency initiative','Official initiative and reports; copyright outcomes are fact-specific.'],
['U.S. Copyright Office — Legislative Developments','https://www.copyright.gov/legislation/','Introduced legislation','Lists H.R. 8915 and S. 4591, the introduced NO FAKES Act of 2026 bills; introduced legislation is pending, and carries no obligation today.'],
['California Labor Code § 927','https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=&chapter=1.&division=2.&lawCode=LAB&part=3.&title=','Enacted state law','Narrow contract rule for specified digital-replica clauses in personal- or professional-services agreements.'],
['Tennessee SB 2096 / ELVIS Act','https://wapp.capitol.tn.gov/apps/BillInfo/Default?BillNumber=SB2096&GA=113','Enacted state law','Official history and enacted Public Chapter 588; effective July 1, 2024.'],
['EU AI Act — EUR-Lex','https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng','Enacted EU regulation, phased','Official EU text; obligations and dates are phased and context-dependent.'],
['Federal Register','https://www.federalregister.gov/documents/search?conditions%5Bterm%5D=artificial+intelligence','Search tool, supplemental','Official publication search; results are supplemental context, and the checklist draws no questions from them.']]
export default function Sources(){return <><Head>
 <title>Sources & limitations — Campaign Governance Issue-Spotter</title>
 <meta name="description" content="The ten official authorities behind the checklist, each labelled enacted law, operative rule, agency guidance or introduced bill — with the verification method and review cadence."/>
 <meta name="robots" content="index, follow"/>
 <link rel="canonical" href={U+'/sources'}/>
 <meta property="og:title" content="Sources & limitations — Campaign Governance Issue-Spotter"/>
 <meta property="og:description" content="Ten official authorities, each labelled by legal status, with the verification method and review cadence."/>
 <meta property="og:type" content="article"/>
 <meta property="og:url" content={U+'/sources'}/>
 <meta property="og:image" content={U+'/og.png'}/>
 <meta property="og:image:width" content="1200"/>
 <meta property="og:image:height" content="630"/>
 <meta property="og:image:alt" content="Campaign Governance Issue-Spotter — eight activation types, each returning a review question at Immediate, Focused or Baseline attention."/>
 <meta name="twitter:card" content="summary_large_image"/>
 <meta name="twitter:image" content={U+'/og.png'}/>
</Head><main><a href="/">← Back to checklist</a><h1>Sources & limitations</h1>
<p>Verified 19 August 2026; next review 19 September 2026. These official starting points support issue spotting. The checklist reads them at the time they are written into it rather than fetching, cross-referencing, ranking, or monitoring them.</p>

<h2 className="sec">Why each entry carries a status</h2>
<p>The authorities below sit at four different levels, and the level decides what a campaign owes today. An <strong>enacted law</strong> binds within its jurisdiction and on its own effective date. An <strong>operative rule</strong> published in the Code of Federal Regulations has the force of law where it applies. <strong>Agency guidance</strong> tells you how the regulator reads a rule it enforces, which is persuasive and practically decisive without itself being legislation. An <strong>introduced bill</strong> creates no obligation at all until it passes, however widely it is reported.</p>
<p>That last distinction is the one most often lost in campaign discussion. The NO FAKES Act is frequently described as though it governs synthetic likeness in the United States today. It is introduced legislation. The enforceable digital-replica rules in this checklist come from California and Tennessee, and they are narrower than the federal bill would be.</p>

{links.map(([t,u,st,d])=><section key={u}><p className="status">{st}</p><h3><a href={u} target="_blank" rel="noreferrer">{t}</a></h3><p>{d}</p></section>)}

<h2 className="sec">How these were verified</h2>
<p>Each link was opened and read at the review date, and each is pointed at the issuing body rather than at a summary, a law-firm client alert, or a news write-up. Where an official consolidated text exists, as with the EU AI Act on EUR-Lex, the link goes to that text and to the dated consolidation rather than to the original publication. State provisions link to the legislature’s own database so that the bill history and the enacted chapter number are both visible from the page you land on.</p>

<h2 className="sec">Review cadence</h2>
<p>The whole set is re-read monthly and the verified date at the top of this page moves only when that has actually happened. A source that has moved is repointed, a bill that has passed is relabelled as enacted, and a question in the checklist that rested on a superseded authority is rewritten before the date changes. Corrections are welcome at <a href="mailto:collins.ra@northeastern.edu">collins.ra@northeastern.edu</a> and are the fastest way to get an error fixed.</p>

<h2 className="sec">Use limitation</h2>
<p>This site is educational information rather than legal advice, a compliance determination, or a substitute for qualified counsel. Laws, guidance, facts, jurisdictions, contracts, and platform rules all change the analysis.</p>
</main><style jsx>{`main{width:min(760px,calc(100% - 40px));margin:60px auto 100px;line-height:1.7}h1{font-size:42px;margin:24px 0}section{background:white;border:1px solid #E2DDD6;border-radius:10px;padding:20px 24px;margin:14px 0}h3{font-size:17px;margin:0 0 5px}h2.sec{font-size:26px;margin:40px 0 10px}.status{font-size:10px;text-transform:uppercase;letter-spacing:.09em;color:#0F5E50;font-weight:800;margin:0 0 6px}p{color:#5A5857}a{color:#0F5E50}`}</style></>}
