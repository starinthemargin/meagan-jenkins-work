import { useEffect, useRef } from 'react'
import { Atmosphere } from './components/Atmosphere'
import { Rich } from './components/Rich'
import { copy, profile } from './content'
import { HuntHud } from './hunt'
import { useScrollProgress, useTheme } from './hooks'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { TechStack } from './pages/TechStack'
import { Work } from './pages/Work'
import { useRoute } from './router'

const titles = {
  home: 'Education program strategy and design',
  work: 'Work',
  'tech-stack': 'Tech stack',
  about: 'About',
} as const

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const progress = useScrollProgress()
  const route = useRoute()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)
  const altitude = Math.round(profile.startAltitude + progress * (profile.summitAltitude - profile.startAltitude))
  const atSummit = progress > 0.985

  useEffect(() => {
    document.title = route.page === 'home' ? `${profile.name} | ${titles.home}` : `${titles[route.page]} | ${profile.name}`
  }, [route.page])

  // Move focus to the new page's content when the route changes, so keyboard and screen-reader users land in it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
  }, [route.page])

  return (
    <div className="world">
      <a
        className="skip-link"
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          mainRef.current?.focus()
          mainRef.current?.scrollIntoView()
        }}
      >
        Skip to content
      </a>
      <Atmosphere />

      <header className="topbar">
        <a className="brand" href="#/">
          <span className="brand-mark" aria-hidden="true">▲</span>
          {profile.name.toLowerCase()}
        </a>
        <div className="altimeter" aria-hidden="true">
          <span className="alt-label">ALT</span>
          <span className="alt-value">{altitude.toLocaleString()} ft</span>
          <span className="alt-note">{atSummit ? 'summit!' : progress < 0.02 ? 'Denver' : 'climbing'}</span>
        </div>
        <nav aria-label="Main">
          {copy.nav.map(([href, label]) => (
            <a key={href} href={href} aria-current={href === `#/${route.page}` ? 'page' : undefined}>
              {label}
            </a>
          ))}
          <button className="theme-toggle" onClick={toggleTheme}>
            <span aria-hidden="true">{theme === 'spooky' ? '🌲' : '🎃'}</span> {theme === 'spooky' ? 'Trail mode' : 'Spooky mode'}
          </button>
        </nav>
        <div className="progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      </header>

      <main id="top" key={route.page} ref={mainRef} tabIndex={-1}>
        {route.page === 'home' && <Home />}
        {route.page === 'work' && <Work tab={route.tab} open={route.open} />}
        {route.page === 'tech-stack' && <TechStack />}
        {route.page === 'about' && <About />}
      </main>

      <footer className="summit">
        <span className="summit-flag" aria-hidden="true">⚑</span>
        <h2>
          <Rich text={copy.footer.title} />
        </h2>
        <p>{copy.footer.intro}</p>
        <div className="hero-actions">
          <a className="btn btn-solid" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            Connect on LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <a className="back" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          ↑ back to the trailhead
        </a>
      </footer>

      <HuntHud />
    </div>
  )
}
