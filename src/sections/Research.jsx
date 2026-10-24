import { motion } from 'framer-motion'
import { ArrowUpRight, GraduationCap, Award } from 'lucide-react'
import { educationList, certifications, languagesList } from '../data/education'

export default function Research() {
  return (
    <section id="education" className="foundation-section section-padding">
      <div className="container-custom">
        <div className="studio-section-heading" data-section-heading>
          <div><span className="eyebrow">06 / THE FOUNDATION</span><h2>Always learning.<br /><span>Always building.</span></h2></div>
          <p>A foundation in computer science, strengthened by hands-on practice and a curious mind.</p>
        </div>
        <div className="foundation-grid">
          {educationList.map(education => <motion.article key={education.id} className="degree-panel" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .6 }}>
            <div className="foundation-label"><span><GraduationCap size={19} /> ACADEMIC FOUNDATION</span><span>{education.duration}</span></div>
            <h3>{education.degree}</h3>
            <p className="degree-institution">{education.institution}<span>{education.university}</span></p>
            <div className="degree-bottom"><div className="degree-score"><strong>{education.gpa.split(' / ')[0]}</strong><span>GPA / 10</span></div><p>{education.details}</p></div>
          </motion.article>)}
          <div className="foundation-aside">
            {certifications.map(certificate => <article className="credential-panel" key={certificate.id}>
              <div className="foundation-label"><span><Award size={18} /> PROFESSIONAL LEARNING</span><span>{certificate.date}</span></div>
              <h3>{certificate.title}</h3><span className="credential-issuer">{certificate.issuer}</span><p>{certificate.skills}</p>
            </article>)}
            <div className="language-panel"><span className="eyebrow">CONNECTING BEYOND CODE</span><h3>Languages I speak</h3><dl>{languagesList.map(language => <div key={language.name}><dt>{language.name}</dt><dd>{language.proficiency}</dd></div>)}</dl></div>
          </div>
        </div>
        <div className="foundation-note"><span>Learning becomes meaningful when you put it to work.</span><a href="#projects">See what I’m building <ArrowUpRight size={17} /></a></div>
      </div>
    </section>
  )
}
