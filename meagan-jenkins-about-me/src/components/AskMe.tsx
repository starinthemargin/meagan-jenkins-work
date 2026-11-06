import { useEffect, useState } from 'react'
import { questions } from '../content'
import { prefersReducedMotion } from '../hooks'

export function AskMe() {
  const [active, setActive] = useState<number | null>(null)
  const [chars, setChars] = useState(0)

  const ask = (i: number) => {
    setActive(i)
    setChars(prefersReducedMotion() ? questions[i].a.length : 0)
  }

  useEffect(() => {
    if (active === null) return
    const total = questions[active].a.length
    const id = window.setInterval(() => {
      setChars((c) => {
        if (c >= total) {
          window.clearInterval(id)
          return c
        }
        return Math.min(total, c + 2)
      })
    }, 18)
    return () => window.clearInterval(id)
  }, [active])

  const answer = active === null ? '' : questions[active].a

  return (
    <div className="ask">
      <div className="chips" role="group" aria-label="Questions">
        {questions.map((q, i) => (
          <button key={q.q} className={`chip ${active === i ? 'active' : ''}`} aria-pressed={active === i} onClick={() => ask(i)}>
            {q.q}
          </button>
        ))}
      </div>
      <div className="answer" role="status">
        {active === null ? (
          <span className="answer-empty">Pick a question and I will answer it.</span>
        ) : (
          <>
            <span className="answer-who">Meagan</span>
            <p className="sr-only">{answer}</p>
            <p aria-hidden="true">
              {answer.slice(0, chars)}
              {chars < answer.length && <span className="caret" />}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
