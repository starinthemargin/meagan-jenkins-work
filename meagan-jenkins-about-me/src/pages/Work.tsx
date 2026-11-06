import { useEffect, useState } from 'react'
import { Cairn } from '../hunt'
import { Rich } from '../components/Rich'
import { caseStudies, copy, courses, guides, videos, type Picture } from '../content'

// Shows a saved poster image first and only loads the Vimeo player when clicked.
function VideoPlayer({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="video-frame">
      {playing ? (
        <iframe
          title={title}
          src={`https://player.vimeo.com/video/${id}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video-poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          <img src={`images/video-${id}.jpg`} alt="" loading="lazy" />
          <span className="play" aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  )
}

function Figure({ image }: { image: Picture }) {
  return (
    <figure
      className={`figure figure--${image.kind}`}
      {...(image.kind === 'shot' ? { tabIndex: 0, role: 'region', 'aria-label': 'Scrollable screenshot' } : {})}
    >
      <img src={image.src} alt={image.alt} loading="lazy" />
    </figure>
  )
}

export function Work({ tab, open }: { tab?: string; open?: string }) {
  const valid = copy.work.tabs.map(([id]) => id)
  const [active, setActive] = useState(tab && valid.includes(tab) ? tab : 'cases')

  useEffect(() => {
    if (tab && valid.includes(tab)) setActive(tab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  useEffect(() => {
    if (open) document.getElementById(`case-${open}`)?.scrollIntoView({ block: 'start' })
  }, [open, active])

  return (
    <section className="waypoint work" aria-labelledby="work-title">
      <header className="waypoint-head">
        <span className="mile">{copy.work.label}</span>
        <h1 id="work-title" className="page-title">
          <Rich text={copy.work.title} />
        </h1>
        <p>{copy.work.intro}</p>
      </header>

      <div className="tabs" role="tablist" aria-label="Kinds of work">
        {copy.work.tabs.map(([id, label]) => (
          <button key={id} role="tab" id={`tab-${id}`} aria-selected={active === id} aria-controls={`panel-${id}`} className={active === id ? 'on' : ''} onClick={() => setActive(id)}>
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} className="tab-panel">
        {active === 'cases' && (
          <div className="cases">
            {caseStudies.map((s, i) => (
              <details key={s.id} id={`case-${s.id}`} className="case" open={open ? open === s.id : i === 0}>
                <summary>
                  <span className="case-company">{s.company}</span>
                  <h2>{s.title}</h2>
                  <span className="case-stat">
                    <b>{s.stat}</b> {s.statLabel}
                  </span>
                </summary>
                <div className="case-body">
                  {s.image && <Figure image={s.image} />}
                  {s.paragraphs?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.sections.map((sec) => (
                    <div key={sec.heading} className="case-section">
                      <h3>{sec.heading}</h3>
                      {sec.text && <p>{sec.text}</p>}
                      {sec.items && (
                        <ul>
                          {sec.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                {i === 0 && <Cairn id="work-case" variant="camo" style={{ right: '1.2rem', bottom: '1rem' }} />}
              </details>
            ))}
          </div>
        )}

        {active === 'elearning' && (
          <div className="stack">
            <div className="note-card">
              {copy.work.elearningNote.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {courses.map((c) => (
              <article key={c.title} className="panel-card">
                <span className="case-company">{c.company}</span>
                <h2>{c.title}</h2>
                {c.image && <Figure image={c.image} />}
                <p>{c.about}</p>
                <h3 className="small-head">Learning objectives</h3>
                {c.objectivesIntro && <p className="muted">{c.objectivesIntro}</p>}
                <ul className="dot-list">
                  {c.objectives.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                {c.riseUrl ? (
                  <a className="btn btn-solid" href={c.riseUrl} target="_blank" rel="noreferrer">
                    View the course ↗<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <p className="todo">Course preview link coming soon.</p>
                )}
              </article>
            ))}
          </div>
        )}

        {active === 'videos' && (
          <div className="video-grid">
            <p className="muted wide">Examples of instructional videos I have created.</p>
            {videos.map((v, i) => (
              <article key={v.title} className="panel-card video">
                {v.vimeoId ? (
                  <VideoPlayer id={v.vimeoId} title={v.title} />
                ) : (
                  <div className="video-frame empty">
                    <span aria-hidden="true">▶</span>
                    <small>Video coming soon</small>
                  </div>
                )}
                <h2>{v.title}</h2>
                <p>{v.blurb}</p>
                {v.vimeoId && (
                  <a className="link-button" href={`https://vimeo.com/${v.vimeoId}`} target="_blank" rel="noreferrer">
                    Not loading? Watch on Vimeo ↗<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                {i === 3 && <Cairn id="work-video" variant="subtle" style={{ top: '0.6rem', left: '0.6rem' }} />}
              </article>
            ))}
          </div>
        )}

        {active === 'guides' && (
          <div className="video-grid">
            <p className="muted wide">Samples of clear, concise, user-friendly documentation designed to educate and empower readers.</p>
            {guides.map((g) => (
              <article key={g.title} className="panel-card guide">
                <a className="guide-thumb" href={g.url} target="_blank" rel="noreferrer" aria-label={`Open ${g.title} (PDF, opens in a new tab)`}>
                  <img src={g.thumb} alt={`First page of ${g.title}`} loading="lazy" />
                </a>
                <span className="case-company">{g.company}</span>
                <h2>{g.title}</h2>
                <p>{g.blurb}</p>
                <a className="btn btn-solid" href={g.url} target="_blank" rel="noreferrer">
                  Open the PDF ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
