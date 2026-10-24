import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { personalInfo } from '../../data/personalInfo'
import { scrollToSection } from '../../utils/sectionNavigation'

const links = [['Home', '#hero'], ['Experience', '#experience'], ['Skills', '#skills'], ['Projects', '#projects'], ['GitHub', '#github'], ['AI Lab', '/ai-lab'], ['Education', '#education'], ['Contact', '#contact']]

export default function Footer() {
  const scrollToTop = () => {
    if (!scrollToSection('hero')) window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return (
    <footer className="site-footer">
      <div className="container-custom">
        <div className="footer-main">
          <div className="footer-brand"><a href="#hero" className="studio-brand" aria-label="Kartik Varma home">kv<span>✳</span></a><p>Thoughtful interfaces.<br />Dependable engineering.</p></div>
          <nav className="footer-navigation" aria-label="Footer navigation"><span className="eyebrow footer-column-heading">EXPLORE</span>{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>
          <div className="footer-socials"><span className="eyebrow">ELSEWHERE</span>{Object.entries(personalInfo.socials).filter(([, url]) => url && url !== '/').map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={15} /></a>)}</div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {personalInfo.name}</p><span>MADE WITH CURIOSITY IN MUMBAI</span><button onClick={scrollToTop} aria-label="Back to top">Back to top <ArrowUp size={16} /></button></div>
      </div>
    </footer>
  )
}
