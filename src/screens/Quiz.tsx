import { useState } from 'react'
import { tripCategories } from '../data/quiz'
import type { QuizCategory } from '../data/quiz'
import { useStore } from '../store'

export default function Quiz() {
  const { state, answerQuiz, routeCountries } = useStore()
  const categories = tripCategories(routeCountries.map((c) => c.id))
  const [cat, setCat] = useState<QuizCategory | null>(null)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)

  // ---- Category picker ----
  if (!cat) {
    return (
      <>
        <h2 className="screen-title">❓ Quiz</h2>
        <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
          Velg et tema. Riktig svar gir ⭐⭐ – og du lærer noe morsomt!
        </p>
        {categories.map((c) => {
          const done = c.questions.filter((q) => state.quiz[q.id]).length
          return (
            <button
              key={c.id}
              className={`row-item ${done === c.questions.length ? 'done' : ''}`}
              onClick={() => {
                setCat(c)
                setIdx(0)
                setPicked(null)
              }}
            >
              <span className="ricon">{c.flag}</span>
              <span>
                <div className="rtitle">{c.title}</div>
                <div className="rdesc">
                  {done}/{c.questions.length} riktige
                </div>
              </span>
              <span className="tickbox" style={{ borderStyle: 'none', background: 'transparent', color: 'var(--muted)' }}>
                ▶
              </span>
            </button>
          )
        })}
      </>
    )
  }

  const q = cat.questions[idx]
  const revealed = picked !== null
  const isLast = idx === cat.questions.length - 1

  return (
    <>
      <button className="backbtn" onClick={() => setCat(null)}>
        ← Temaer
      </button>
      <h2 className="screen-title" style={{ marginTop: 10 }}>
        {cat.flag} {cat.title}
      </h2>

      <div className="progressdots">
        {cat.questions.map((_, i) => (
          <span key={i} className={`dot ${i <= idx ? 'filled' : ''}`} />
        ))}
      </div>

      <div className="card">
        <div className="quiz-q">{q.q}</div>
        <div className="quiz-opts">
          {q.options.map((opt, i) => {
            let cls = 'opt'
            if (revealed) {
              if (i === q.answer) cls += ' correct'
              else if (i === picked) cls += ' wrong'
              else cls += ' dim'
            }
            return (
              <button
                key={i}
                className={cls}
                disabled={revealed}
                onClick={() => {
                  setPicked(i)
                  answerQuiz(q.id, i === q.answer)
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {revealed && (
          <>
            <div className="factbox">
              {picked === q.answer ? '✅ Riktig! ' : '💡 '}
              {q.fact}
            </div>
            {!isLast ? (
              <button
                className="primary"
                onClick={() => {
                  setIdx(idx + 1)
                  setPicked(null)
                }}
              >
                Neste spørsmål →
              </button>
            ) : (
              <button className="primary" onClick={() => setCat(null)}>
                Ferdig! Tilbake til temaer 🎉
              </button>
            )}
          </>
        )}
      </div>
    </>
  )
}
