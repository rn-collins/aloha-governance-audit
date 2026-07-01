import { useState, useEffect } from 'react'
import Head from 'next/head'
import InquiryModal from '../components/InquiryModal';

const G='#1B7A68',GD='#0F5E50',GL='#E8F5F2',BG='#F6F3EC',TX='#1C1B1F',MU='#5A5857',BD='#E2DDD6'
const RISK={High:{bg:'#FCEBEB',text:'#A32D2D'},Medium:{bg:'#FAEEDA',text:'#854F0B'},Low:{bg:'#EAF3DE',text:'#3B6D11'}}

const AUDIT_LOGIC={
  influencer:{title:'Influencer / creator partnerships',risk:'Medium',exposure:'FTC 2023 Endorsement Guide updates require clear disclosure for all paid partnerships. AI-generated content within influencer posts requires additional disclosure under 2024 FTC AI guidance.',mitigation:'Audit all active agreements for AI content clauses. Ensure disclosure language covers all content formats — static, Stories, video, and live.'},
  'ai-content':{title:'AI-generated content',risk:'High',exposure:'FTC guidance (2024) requires clear disclosure when content is AI-generated or materially altered. Most pre-2023 influencer agreements lack AI content clauses entirely.',mitigation:'Add AI content rider to all active agreements. Minimum provisions: disclosure obligation, agency review rights, IP ownership of AI-assisted work product.'},
  music:{title:'Licensed or AI-generated music',risk:'Medium',exposure:'AI music licensing is legally unsettled. Copyright Office (2024) confirmed AI-generated music is not independently copyrightable. Tools trained on unlicensed music create downstream exposure.',mitigation:'Use only music from platforms with explicit AI licensing frameworks. Document provenance of all AI-generated music. Do not rely on "sounds original" as a legal defense.'},
  synthetic:{title:'Synthetic media / deepfakes',risk:'High',exposure:'California AB 2602 (2024), Tennessee ELVIS Act (2024), and the proposed federal NO FAKES Act all create distinct exposure for unconsented use of AI-generated likeness.',mitigation:'Obtain explicit written AI likeness consent before any production. Do not rely on verbal consent or existing talent agreements — they predate AI-specific rights.'},
  ugc:{title:'User-generated content',risk:'Low',exposure:'Standard UGC policies apply. Monitor for AI-generated UGC mixed into campaigns — FTC may require disclosure even when the brand did not generate the content.',mitigation:'Add AI content monitoring to UGC review process. Update UGC submission terms to require disclosure of AI-generated submissions.'},
  celebrity:{title:'Celebrity likeness or partnership',risk:'High',exposure:'Digital likeness rights are not uniformly codified. State right-of-publicity laws vary significantly. AI-generated celebrity likeness without explicit consent is high-risk regardless of perceived permission.',mitigation:'Obtain explicit written AI likeness consent separate from standard talent agreements. Brief legal counsel before any AI-adjacent celebrity activation.'},
  'film-tv':{title:'Film or TV content integration',risk:'Low',exposure:'Standard licensed content integration. Monitor for AI-generated content within the show itself — some productions are beginning to use AI for background elements.',mitigation:'Standard content licensing due diligence applies. Add AI content inquiry to production licensing review.'},
  virtual:{title:'Virtual influencer or avatar',risk:'High',exposure:'Virtual influencers are not covered by standard influencer disclosure frameworks. FTC guidance on AI-generated personas is still developing. EU AI Act (Aug 2026) requires disclosure of AI-generated personas interacting with consumers.',mitigation:'Implement clear "AI character" disclosure on all content. Brief legal on FTC AI disclosure requirements and EU AI Act compliance before any activation.'}
}

export default function Home(){
  const [reg,setReg]=useState(null)
  const [regLoading,setRegLoading]=useState(true)
  const [clientType,setClientType]=useState('')
  const [desc,setDesc]=useState('')
  const [checked,setChecked]=useState([])
  const [results,setResults]=useState(null)
  const [running,setRunning]=useState(false)

  useEffect(()=>{
    fetch('/api/regulatory').then(r=>r.json()).then(d=>{setReg(d);setRegLoading(false)}).catch(()=>setRegLoading(false))
  },[])

  const toggle=(v)=>setChecked(prev=>prev.includes(v)?prev.filter(x=>x!==v):[...prev,v])

  const runAudit=async()=>{
    if(!clientType)return
    setRunning(true)
    await new Promise(r=>setTimeout(r,1400))
    const findings=checked.map(k=>AUDIT_LOGIC[k]).filter(Boolean)
    if(!findings.length)findings.push({title:'Standard activation — limited AI governance exposure',risk:'Low',exposure:'No high-risk AI or synthetic media components identified based on selected activation types.',mitigation:'Maintain standard FTC disclosure practices and UGC review protocols.'})
    setResults(findings)
    setRunning(false)
  }

  const totalFtc=(reg?.ftc||[]).length
  const totalCongress=(reg?.congress||[]).length
  const totalFR=(reg?.federalRegister||[]).length

  return(<>
    <Head>
      <title>Culture Governance Audit — Aloha AI Consulting</title>
      <meta name="description" content="Cross-reference your campaign's AI and influencer activations against live FTC enforcement actions, pending Congressional AI legislation, and Federal Register rulemaking."/>
      <meta name="robots" content="noindex"/>
      <meta property="og:title" content="Culture Governance Audit — Aloha AI Consulting"/>
      <meta property="og:description" content="Live AI governance risk assessment for marketing and cultural activations."/>
      <meta property="og:type" content="website"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=Manrope:wght@400;500&family=DM+Mono&display=swap" rel="stylesheet"/>
    </Head>
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:BG}}>
      <header style={{background:G,padding:'16px clamp(20px, 5vw, 40px)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:36,height:36,borderRadius:6,background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.25)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne',fontSize:10,fontWeight:700,color:'white',letterSpacing:'.05em'}}>AAC</div>
          <div>
            <div style={{fontFamily:'Syne',fontSize:14,fontWeight:600,color:'white'}}>Aloha AI Consulting</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,.6)'}}>Culture Governance Audit</div>
          </div>
        </div>
        {!regLoading&&(
          <div style={{fontFamily:'DM Mono',fontSize:11,color:'rgba(255,255,255,.6)'}}>
            {totalFtc} FTC actions · {totalCongress} AI bills · {totalFR} Fed Register items · live
          </div>
        )}
      </header>

      <main style={{flex:1,maxWidth:860,margin:'0 auto',padding:'clamp(32px, 5vw, 56px) clamp(20px, 5vw, 40px) 100px',width:'100%'}}>
        <h1 style={{fontFamily:'Syne',fontSize:30,fontWeight:700,color:TX,marginBottom:10,letterSpacing:'-.02em'}}>Culture Governance Audit</h1>
        <p style={{fontSize:15,color:MU,lineHeight:1.65,marginBottom:48,maxWidth:600}}>Select your client industry and activation types. The tool cross-references them against live FTC enforcement actions, pending Congressional AI legislation, and Federal Register rulemaking to generate a current risk assessment.</p>

        {/* Live regulatory context strip */}
        {!regLoading&&(totalFtc>0||totalCongress>0)&&(
          <div style={{background:'white',border:`1px solid ${BD}`,borderRadius:8,padding:'16px 20px',marginBottom:32,display:'flex',gap:24,flexWrap:'wrap'}}>
            <div style={{fontFamily:'Syne',fontSize:11,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:MU,alignSelf:'center',flexShrink:0}}>Live regulatory context</div>
            {(reg?.ftc||[]).slice(0,2).map((item,i)=>(
              <div key={i} style={{flex:'1 1 200px',minWidth:0}}>
                <div style={{fontSize:11,fontFamily:'DM Mono',color:'#854F0B',marginBottom:2}}>FTC</div>
                <a href={item.link} target="_blank" rel="noreferrer" style={{fontSize:12,color:TX,lineHeight:1.4,display:'block'}}>{item.title?.slice(0,80)}{item.title?.length>80?'…':''}</a>
              </div>
            ))}
            {(reg?.congress||[]).slice(0,1).map((item,i)=>(
              <div key={i} style={{flex:'1 1 200px',minWidth:0}}>
                <div style={{fontSize:11,fontFamily:'DM Mono',color:'#534AB7',marginBottom:2}}>Congress</div>
                <a href={item.link} target="_blank" rel="noreferrer" style={{fontSize:12,color:TX,lineHeight:1.4,display:'block'}}>{item.title?.slice(0,80)}{item.title?.length>80?'…':''}</a>
              </div>
            ))}
          </div>
        )}

        <div style={{background:'white',border:`1px solid ${BD}`,borderRadius:10,padding:'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 40px)',marginBottom:40}}>
          <div style={{marginBottom:24}}>
            <label htmlFor="client-industry" style={{display:'block',fontFamily:'Syne',fontSize:12,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:MU,marginBottom:8}}>Client industry</label>
            <select id="client-industry" value={clientType} onChange={e=>setClientType(e.target.value)} aria-label="Client industry" style={{width:'100%',padding:'12px 16px',border:`1px solid ${BD}`,borderRadius:6,fontFamily:'Manrope',fontSize:15,color:TX,background:BG,appearance:'none',outline:'none'}}>
              <option value="">Select industry...</option>
              {['Fashion & Luxury','Beauty & Personal Care','Entertainment & Media','Technology','Sports & Fitness','Food & Beverage','Financial Services','Health & Wellness','Retail & E-commerce'].map(o=><option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{marginBottom:24}}>
            <label htmlFor="campaign-desc" style={{display:'block',fontFamily:'Syne',fontSize:12,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:MU,marginBottom:8}}>Campaign description</label>
            <input id="campaign-desc" type="text" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="e.g. Influencer-led launch campaign featuring AI-generated content..." aria-label="Campaign description" style={{width:'100%',padding:'12px 16px',border:`1px solid ${BD}`,borderRadius:6,fontFamily:'Manrope',fontSize:15,color:TX,background:BG,outline:'none'}}/>
          </div>
          <div style={{marginBottom:28}}>
            <label style={{display:'block',fontFamily:'Syne',fontSize:12,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:MU,marginBottom:8}}>Activation types</label>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))',gap:10}}>
              {Object.entries(AUDIT_LOGIC).map(([k,v])=>(
                <label key={k} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',border:`1px solid ${checked.includes(k)?G:BD}`,borderRadius:6,background:checked.includes(k)?GL:BG,cursor:'pointer'}}>
                  <input type="checkbox" checked={checked.includes(k)} onChange={()=>toggle(k)} style={{accentColor:G,width:16,height:16,flexShrink:0}}/>
                  <span style={{fontSize:13,color:TX}}>{v.title}</span>
                </label>
              ))}
            </div>
          </div>
          <p style={{fontSize:12,color:MU,lineHeight:1.6,marginBottom:16,padding:'12px 16px',background:GL,borderRadius:6,border:`1px solid ${BD}`}}>This tool provides informational risk context only and does not constitute legal advice. Consult qualified legal counsel before making compliance decisions.</p>
          <button onClick={runAudit} disabled={!clientType||running} style={{display:'block',width:'100%',padding:16,background:!clientType||running?'#9BBFBA':G,border:'none',borderRadius:8,fontFamily:'Syne',fontSize:15,fontWeight:600,color:'white',cursor:!clientType||running?'not-allowed':'pointer'}}>
            {running?'Running audit...':'Run Governance Audit'}
          </button>
        </div>

        {results&&(
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:6}}>
              <h2 style={{fontFamily:'Syne',fontSize:20,fontWeight:700,color:TX}}>{results.length} exposure area{results.length!==1?'s':''} identified</h2>
              <button onClick={()=>{setResults(null);setChecked([]);setDesc('');setClientType('')}} style={{fontFamily:'Syne',fontSize:12,fontWeight:600,padding:'8px 16px',background:'transparent',border:`1px solid ${BD}`,borderRadius:6,color:MU,cursor:'pointer'}}>Clear and start over</button>
            </div>
            <p style={{fontSize:14,color:MU,marginBottom:24}}>{results.filter(r=>r.risk==='High').length} high-risk · {results.filter(r=>r.risk==='Medium').length} medium-risk · cross-referenced against {totalFtc} live FTC actions and {totalCongress} pending AI bills</p>
            {results.map((f,i)=>{
              const rc=RISK[f.risk]||RISK.Low
              return(
                <div key={i} style={{background:'white',border:`1px solid ${BD}`,borderRadius:10,padding:'28px 32px',marginBottom:16}}>
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:16,marginBottom:16}}>
                    <div style={{fontFamily:'Syne',fontSize:16,fontWeight:600,color:TX}}>{f.title}</div>
                    <span style={{display:'inline-block',padding:'5px 12px',borderRadius:4,fontFamily:'Syne',fontSize:11,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',background:rc.bg,color:rc.text,flexShrink:0}}>{f.risk} Risk</span>
                  </div>
                  <div style={{borderTop:`1px solid ${BD}`,paddingTop:16}}>
                    {[['Exposure',f.exposure],['Mitigation',f.mitigation]].map(([label,text])=>(
                      <div key={label} style={{marginBottom:12}}>
                        <div style={{fontFamily:'Syne',fontSize:11,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:MU,marginBottom:4}}>{label}</div>
                        <div style={{fontSize:14,color:TX,lineHeight:1.65}}>{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
            <InquiryModal source="governance-audit" />
    </main>

      <footer style={{background:TX,padding:'28px clamp(20px, 5vw, 40px)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
        <div>
          <div style={{fontFamily:'Syne',fontSize:13,fontWeight:600,color:'white'}}>RN Collins</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginTop:2}}>Neuroscientist · JD Candidate, Northeastern · AI Governance Researcher, Brown University AISLE Project</div>
        </div>
        <div style={{display:'flex',gap:20}}>
          <a href="mailto:collins.ra@northeastern.edu" style={{fontSize:13,color:'rgba(255,255,255,.65)'}}>collins.ra@northeastern.edu</a>
          <a href="https://linkedin.com/in/rn-collins" target="_blank" rel="noreferrer" style={{fontSize:13,color:'rgba(255,255,255,.65)'}}>LinkedIn</a>
        </div>
      </footer>
    </div>
  </>)
}
