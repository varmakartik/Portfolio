import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { ArrowUpRight, ArrowLeft, Aperture, Film, Sparkles, ArrowRight, Maximize2, Minimize2 } from 'lucide-react'
import { creativeCollections, creativeImages } from '../data/creativeLab'

const icons = { Images: Aperture, Videos: Film, Experiments: Sparkles }
const imageRows = Array.from({ length: Math.ceil(creativeImages.length / 2) }, (_, index) => creativeImages.slice(index * 2, index * 2 + 2))

export default function CreativeLab({ standalone = false }) {
  const [category, setCategory] = useState(() => {
    if (!standalone) return 'All explorations'
    const view = new URLSearchParams(window.location.search).get('view')
    return creativeCollections.find(item => item.category.toLowerCase() === view)?.category || 'All explorations'
  })
  const reduced = useReducedMotion()
  const filtersRef = useRef(null)
  const viewerCloseRef = useRef(null)
  const viewerTriggerRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [viewMode, setViewMode] = useState('fit')
  useEffect(() => {
    const filters = filtersRef.current
    if (!standalone || !filters || filters.scrollWidth <= filters.clientWidth) return
    const selected = filters.querySelector('[aria-pressed="true"]')
    if (!selected) return
    const bounds = filters.getBoundingClientRect()
    const selectedBounds = selected.getBoundingClientRect()
    if (selectedBounds.left < bounds.left) filters.scrollLeft += selectedBounds.left - bounds.left
    else if (selectedBounds.right > bounds.right) filters.scrollLeft += selectedBounds.right - bounds.right
  }, [category, standalone])
  useEffect(() => {
    if (!selectedImage) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    viewerCloseRef.current?.focus()
    const onKeyDown = event => {
      if (event.key === 'Escape') { event.preventDefault(); setSelectedImage(null) }
      if (event.key === 'Tab') {
        const buttons = [...document.querySelectorAll('.lab-image-viewer button')]
        const current = buttons.indexOf(document.activeElement)
        const next = (current + (event.shiftKey ? buttons.length - 1 : 1)) % buttons.length
        event.preventDefault()
        buttons[next]?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (viewerTriggerRef.current?.isConnected) viewerTriggerRef.current.focus({ preventScroll: true })
    }
  }, [selectedImage])
  return <section id="ai-lab" className={`creative-lab ${standalone ? 'lab-standalone' : ''}`}>
    <div className="container-custom">
      {standalone && <nav className="lab-navigation" aria-label="Creative lab navigation"><a className="lab-wordmark" href="/">kv<span>✳</span></a><a href="/#ai-lab"><ArrowLeft size={15} /> Back to portfolio</a></nav>}
      <div data-section-heading className="lab-heading"><div><span className="eyebrow">05 / THE CREATIVE SIDE</span><h2>Engineering meets<br /><em>imagination.</em><span className="lab-star" aria-hidden="true">✳</span></h2></div><div className="lab-heading-aside"><span className="lab-status"><span /> IN PROGRESS</span><p>A space for what happens when curiosity meets AI. Images, films, and experiments beyond the code.</p></div></div>
      <div className="lab-toolbar"><span>THE AI CREATIVE LAB</span>{standalone ? <div ref={filtersRef} className="lab-filters" role="group" aria-label="Creative medium">{['All explorations', 'Images', 'Videos', 'Experiments'].map(label => <button key={label} aria-pressed={category === label} onClick={() => setCategory(label)}>{label}</button>)}</div> : <a href="/ai-lab">Enter the lab <ArrowUpRight size={16} /></a>}</div>
      {category === 'Images' ? <div className="lab-image-gallery" aria-label="AI generated image gallery">
        {imageRows.map((row, rowIndex) => <div key={row[0].src} className={`lab-image-row ${rowIndex % 2 ? 'lab-image-row-reverse' : ''} ${row.every(image => image.orientation === 'portrait') ? 'lab-image-row-portraits' : ''}`}>
          {row.map((image, imageIndex) => {
            const index = rowIndex * 2 + imageIndex
            return <motion.figure key={image.src} className={`lab-image-tile lab-image-tile-${index + 1}`} initial={{ opacity: 0, y: reduced ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.06 }}><img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} /><button type="button" className="lab-image-expand" aria-label={`View image ${index + 1} full screen`} onClick={event => { viewerTriggerRef.current = event.currentTarget; setViewMode(image.orientation === 'portrait' ? 'fit' : 'fill'); setSelectedImage(image) }}><span><Maximize2 size={17} aria-hidden="true" /></span></button></motion.figure>
          })}
        </div>)}
      </div> : category === 'Videos' || category === 'Experiments' ? <div className="lab-coming-soon" role="status">
        {category === 'Videos' ? <Film size={32} strokeWidth={1.4} aria-hidden="true" /> : <Sparkles size={32} strokeWidth={1.4} aria-hidden="true" />}
        <span>IN PROGRESS</span><h3>{category === 'Videos' ? 'AI videos are coming soon.' : 'Experiments are coming soon.'}</h3>
        <p>{category === 'Videos' ? 'This collection is being built. Generated films will appear here when they are ready.' : 'New creative experiments will appear here as they are finished.'}</p>
      </div> : <div className="lab-grid">
        {creativeCollections.map(item => {
          const Icon = icons[item.category]
          const published = Boolean(item.media?.src)
          return <motion.article key={item.id} className={`lab-card lab-${item.theme}`} initial={{ opacity: 0, y: reduced ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 0.6 }}>
            {published ? <div className="lab-art lab-published-media">{item.media.type === 'video' ? <video controls playsInline preload="metadata" poster={item.media.poster} aria-label={item.title}><source src={item.media.src} />Your browser does not support video playback.</video> : <img src={item.media.src} alt={item.media.alt || item.title} loading="lazy" />}</div> : <div className={`lab-art art-${item.theme}`} aria-hidden="true"><div className="art-grain" />{item.theme === 'landscape' ? <><div className="art-sun" /><div className="art-horizon" /><div className="art-ridge ridge-one" /><div className="art-ridge ridge-two" /></> : item.theme === 'film' ? <><div className="film-gate"><div className="film-portal" /><div className="film-light" /></div><span className="film-timecode">SCENE / 001</span><div className="film-perforations" /></> : <><div className="sculpture-ring ring-one" /><div className="sculpture-ring ring-two" /><div className="sculpture-ring ring-three" /><div className="sculpture-shadow" /></>}
              <div className="lab-art-top"><Icon size={18} /><span>COLLECTION {item.number}</span></div><span className="lab-art-note">IN PROGRESS / COMING SOON</span>
            </div>}
            <div className="lab-card-copy"><span>{item.medium}</span><h3>{item.title}</h3><p>{item.description}</p><div><span className="lab-collection-status"><i /> {published ? 'Published' : 'In progress'}</span><Icon size={17} /></div></div>
            {standalone ? <button className="lab-card-open" type="button" aria-label={`Open ${item.category}`} onClick={() => setCategory(item.category)} /> : <a className="lab-card-open" href={`/ai-lab?view=${item.category.toLowerCase()}`} aria-label={`Open ${item.category}`} />}
          </motion.article>
        })}
      </div>}
      <div className="lab-bottom"><p><span className="status-dot" /> {category === 'Images' ? `${creativeImages.length} AI-generated explorations. More are on the way.` : 'New work will appear here as each collection takes shape.'}</p>{standalone ? <a href="/#contact">Have a creative idea? <ArrowRight size={15} /></a> : <a href="/ai-lab">A little more curiosity <ArrowRight size={15} /></a>}</div>
    </div>
    {selectedImage && createPortal(<motion.div className={`lab-image-viewer lab-image-viewer-${viewMode}`} role="dialog" aria-modal="true" aria-label="Full-screen AI image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.2 }}>
      <img src={selectedImage.src} alt={selectedImage.alt} />
      <div className="lab-image-view-controls" role="group" aria-label="Image display mode"><button type="button" aria-pressed={viewMode === 'fit'} onClick={() => setViewMode('fit')}>Fit</button><button type="button" aria-pressed={viewMode === 'fill'} onClick={() => setViewMode('fill')}>Fill</button></div>
      <button ref={viewerCloseRef} type="button" className="lab-image-minimize" aria-label="Minimize image" onClick={() => setSelectedImage(null)}><Minimize2 size={20} aria-hidden="true" /><span>Minimize</span></button>
    </motion.div>, document.body)}
  </section>
}
