import { FaGithub as Github } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, GitCommitHorizontal, RefreshCw } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'
import { contributionSummary, validateContributions } from '../utils/contributions'

const username = new URL(personalInfo.socials.github).pathname.split('/').filter(Boolean)[0]
const endpoint = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`
let cached = null
const formatDate = date => new Date(`${date}T12:00:00Z`).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

function Calendar({ days }) {
  const [selected, setSelected] = useState(days.length - 1)
  const calendarRef = useRef(null)
  const firstDay = new Date(`${days[0].date}T12:00:00Z`).getUTCDay()
  const weeks = Math.ceil((days.length + firstDay) / 7)
  const months = days.map((day, index) => ({ day, index })).filter(({ day, index }) => index === 0 || day.date.slice(5, 7) !== days[index - 1].date.slice(5, 7))
  const detail = days[selected]
  const move = (event, index) => {
    const offset = { ArrowRight: 7, ArrowLeft: -7, ArrowDown: 1, ArrowUp: -1 }[event.key]
    if (offset === undefined && event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? days.length - 1 : Math.max(0, Math.min(days.length - 1, index + offset))
    setSelected(next)
    calendarRef.current?.querySelector(`[data-day-index="${next}"]`)?.focus()
  }
  return <>
    <div className="contribution-scroll" ref={calendarRef}>
      <div className="contribution-months" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>{months.map(({ day, index }) => <span key={day.date} style={{ gridColumn: Math.floor((index + firstDay) / 7) + 1 }}>{new Date(`${day.date}T12:00:00Z`).toLocaleDateString('en', { month: 'short', timeZone: 'UTC' })}</span>)}</div>
      <div className="contribution-calendar" role="group" aria-label="Daily GitHub contributions. Use arrow keys to explore." style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
        {Array.from({ length: firstDay }, (_, i) => <span key={`blank-${i}`} className="contribution-blank" aria-hidden="true" />)}
        {days.map((day, index) => <button key={day.date} data-day-index={index} data-level={day.level} tabIndex={selected === index ? 0 : -1} aria-label={`${day.count} contributions on ${formatDate(day.date)}`} title={`${day.count} contributions · ${formatDate(day.date)}`} onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)} onKeyDown={event => move(event, index)} />)}
      </div>
    </div>
    <div className="contribution-legend"><p aria-live="polite">{detail.count} contributions <span>on {formatDate(detail.date)}</span></p><div><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i key={level} data-level={level} />)}<span>More</span></div></div>
  </>
}

export default function GithubActivity() {
  const [state, setState] = useState({ status: 'loading', days: [] })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    if (cached && Date.now() - cached.at < 3600000 && attempt === 0) { setState({ status: 'ready', days: cached.days }); return }
    const controller = new AbortController()
    let alive = true
    const timer = setTimeout(() => controller.abort(), 12000)
    setState({ status: 'loading', days: [] })
    fetch(endpoint, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error('Contribution service unavailable')
      return response.json()
    }).then(data => {
      const days = validateContributions(data)
      cached = { days, at: Date.now() }
      if (alive) setState({ status: 'ready', days })
    }).catch(() => { if (alive) setState({ status: 'error', days: [] }) }).finally(() => clearTimeout(timer))
    return () => { alive = false; clearTimeout(timer); controller.abort() }
  }, [attempt])
  const summary = contributionSummary(state.days)
  return <section id="github" className="github-section section-padding"><div className="container-custom">
    <div data-section-heading className="studio-section-heading"><div><span className="eyebrow">04 / THE WORK BETWEEN RELEASES</span><h2>Small commits.<br /><span>Steady progress.</span></h2></div><p>A look at my contribution activity on GitHub. The everyday work behind the projects.</p></div>
    <div className="github-card"><div className="github-card-header"><div className="github-identity"><span><Github size={25} /></span><div><h3>@{username}</h3><p>GitHub contribution activity</p></div></div><a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer">View profile <ArrowUpRight size={16} /></a></div>
      {state.status === 'ready' ? <><div className="github-metrics"><div><strong>{summary.total.toLocaleString()}</strong><span>Contributions</span></div><div><strong>{summary.activeDays}</strong><span>Active days</span></div><div><strong>{summary.bestDay}</strong><span>Most in one day</span></div><p><GitCommitHorizontal size={15} />{formatDate(state.days[0].date)} – {formatDate(state.days.at(-1).date)}</p></div><Calendar days={state.days} /></> : <div className={`github-state ${state.status}`} role="status">{state.status === 'loading' ? <><div className="calendar-skeleton" aria-hidden="true" /><p>Loading contribution activity…</p></> : <><Github size={30} /><h3>Activity is temporarily unavailable.</h3><p>You can still explore my work directly on GitHub.</p><button onClick={() => setAttempt(value => value + 1)}><RefreshCw size={14} /> Try again</button></>}</div>}
      <div className="github-source"><span><span className="status-dot" /> Public profile activity · updated periodically</span><a href="https://github.com/grubersjoe/github-contributions-api" target="_blank" rel="noopener noreferrer">Data via GitHub Contributions API <ArrowUpRight size={12} /></a></div>
    </div>
  </div></section>
}
