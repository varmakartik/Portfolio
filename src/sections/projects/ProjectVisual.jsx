import { ShieldCheck, ArrowUpRight, Sparkles, Check, FileText, Users, LockKeyhole } from 'lucide-react'

import { projectPresentation } from '../../data/projectPresentation'

export default function ProjectVisual({ project }) {
  const meta = projectPresentation[project.id]
  return <div className={`work-visual visual-${meta.theme}`} aria-hidden="true">
    <span className="visual-caption">{meta.label}</span><span className="visual-concept">INTERFACE CONCEPT</span>
    {project.id === 1 ? <div className="auth-diagram"><div className="auth-orbit" /><div className="auth-orbit second" /><div className="auth-core"><ShieldCheck size={43} strokeWidth={1.3} /><strong>ZERO</strong><span>IDENTITY LAYER</span></div><span className="auth-node node-client"><Users size={15} /> Client</span><span className="auth-node node-token"><LockKeyhole size={15} /> Token rotation</span><span className="auth-node node-access"><Check size={15} /> Access verified</span></div> :
      project.id === 2 ? <div className="concept-window career-window"><div className="concept-window-top"><Sparkles size={16} /><strong>careerly</strong><span>YOUR NEXT CHAPTER</span></div><h4>Big goals.<br /><em>Small, clear steps.</em></h4><div className="career-steps">{['Discover your direction', 'Build your roadmap', 'Learn. Grow. Repeat.'].map((text, i) => <div key={text}><span>0{i + 1}</span>{text}<ArrowUpRight size={13} /></div>)}</div></div> :
      project.id === 3 ? <div className="concept-window finance-window"><div className="concept-window-top"><strong>fintrack<span>↗</span></strong><span>YOUR MONEY, IN FOCUS</span></div><div className="finance-label">A little more perspective.</div><div className="concept-chart">{[35, 52, 44, 71, 57, 85, 69, 94, 80, 100].map((height, i) => <span key={i} style={{ height: `${height}%` }} />)}</div><div className="finance-key"><span><i /> Income</span><span>Spending</span><span>Savings</span></div></div> :
      project.id === 4 ? <div className="concept-window people-window"><div className="concept-window-top"><strong>NEXUS<span> / HR</span></strong><Users size={16} /></div><h4>Good work starts<br />with great people.</h4><div className="people-rows">{['Team directory', 'Attendance & leave', 'Roles & permissions'].map((label, i) => <div key={label}><span>{['◎', '◷', '⊞'][i]}</span><strong>{label}</strong><ArrowUpRight size={14} /></div>)}</div></div> :
      <div className="concept-window notes-window"><div className="concept-window-top"><strong>connect.</strong><span>YOUR SHARED WORKSPACE</span></div><div className="notes-paper"><FileText size={20} /><h4>A place for<br />what’s next.</h4><div /><div /><div /><span>Ideas → notes → possibilities</span></div></div>}
    <span className="visual-bottom">{meta.caption}</span>
  </div>
}
