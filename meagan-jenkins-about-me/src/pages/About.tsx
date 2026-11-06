import { AskMe } from '../components/AskMe'
import { Campfire } from '../components/Campfire'
import { Carousel } from '../components/Carousel'
import { Rich } from '../components/Rich'
import { Route } from '../components/Route'
import { TrailSigns } from '../components/TrailSigns'
import { Cairn } from '../hunt'
import { copy, profile } from '../content'

export function About() {
  const a = copy.about
  return (
    <>
      <section className="hero">
        <div className="hero-copy" style={{ position: 'relative' }}>
          <p className="eyebrow">
            <span className="pin" aria-hidden="true" /> {a.eyebrow}
          </p>
          <h1 className="about-title">About me</h1>
          <p className="tagline">
            {a.tagline[0]} <em>{a.tagline[1]}</em>
          </p>
          {a.intro.map((p) => (
            <p className="intro" key={p}>
              {p}
            </p>
          ))}
          <div className="hero-actions">
            <a className="btn btn-solid" href={profile.linkedin} target="_blank" rel="noreferrer">
              {a.connectLabel}<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
              {a.emailLabel}
            </a>
          </div>
          <ul className="tags" aria-label="Quick facts">
            <li>{profile.degree}</li>
            <li>{profile.role}</li>
          </ul>
          <Cairn id="about-hero" variant="camo" style={{ right: '2%', top: '0.4rem' }} />
        </div>
        <Carousel />
      </section>

      <section className="waypoint" id="trail" aria-labelledby="trail-title">
        <header className="waypoint-head">
          <span className="mile">{copy.trail.label}</span>
          <h2 id="trail-title">
            <Rich text={copy.trail.title} />
          </h2>
          <p>{copy.trail.intro}</p>
        </header>
        <div className="trail-grid">
          <div style={{ position: 'relative' }}>
            <TrailSigns />
            <Cairn id="about-signs" variant="hover" style={{ left: '0.2rem', bottom: '-0.6rem' }} />
          </div>
          <Campfire />
        </div>
      </section>

      <section className="waypoint" id="ask" aria-labelledby="ask-title">
        <header className="waypoint-head">
          <span className="mile">{copy.ask.label}</span>
          <h2 id="ask-title">
            <Rich text={copy.ask.title} />
          </h2>
          <p>{copy.ask.intro}</p>
        </header>
        <AskMe />
      </section>

      <section className="waypoint" id="route" aria-labelledby="route-title" style={{ position: 'relative' }}>
        <header className="waypoint-head">
          <span className="mile">{copy.route.label}</span>
          <h2 id="route-title">
            <Rich text={copy.route.title} />
          </h2>
          <p>{copy.route.intro}</p>
        </header>
        <Route />
        <Cairn id="about-route" variant="subtle" style={{ right: '1.5rem', top: '1.5rem' }} />
      </section>
    </>
  )
}
