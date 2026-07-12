import { useMemo, useState } from 'react'
import { PLATES } from '../data/plates'
import { useStore } from '../store'

// Pool of countries to guess (reuses the plate list – 16 European flags).
const POOL = PLATES.map((p) => ({ code: p.code, name: p.country, flag: p.flag }))

function pickRound(preferUnseen: string[]) {
  // Prefer flags not yet guessed correctly, so it feels like progress.
  const unseen = POOL.filter((c) => !preferUnseen.includes(c.code))
  const bag = unseen.length > 0 ? unseen : POOL
  const correct = bag[Math.floor(Math.random() * bag.length)]

  const distractors = POOL.filter((c) => c.code !== correct.code)
  // Shuffle distractors and take 3.
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[distractors[i], distractors[j]] = [distractors[j], distractors[i]]
  }
  const options = [correct, ...distractors.slice(0, 3)]
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[options[i], options[j]] = [options[j], options[i]]
  }
  return { correct, options }
}

export default function Flags() {
  const { state, guessFlag } = useStore()
  const [round, setRound] = useState(() => pickRound(state.flags))
  const [picked, setPicked] = useState<string | null>(null)

  const done = state.flags.length
  const revealed = picked !== null
  const gotIt = picked === round.correct.code

  const next = useMemo(
    () => () => {
      setRound(pickRound(state.flags))
      setPicked(null)
    },
    [state.flags],
  )

  return (
    <>
      <h2 className="screen-title">🚩 Gjett landet</h2>
      <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
        Hvilket land hører flagget til? Riktig gjetning gir ⭐⭐. Gjettet riktig på {done} av{' '}
        {POOL.length} flagg.
      </p>

      <div className="card" style={{ textAlign: 'center' }}>
        <div className="flag-big">{round.correct.flag}</div>
        <div className="quiz-opts" style={{ marginTop: 8 }}>
          {round.options.map((opt) => {
            let cls = 'opt'
            if (revealed) {
              if (opt.code === round.correct.code) cls += ' correct'
              else if (opt.code === picked) cls += ' wrong'
              else cls += ' dim'
            }
            return (
              <button
                key={opt.code}
                className={cls}
                disabled={revealed}
                style={{ textAlign: 'center' }}
                onClick={() => {
                  setPicked(opt.code)
                  guessFlag(round.correct.code, opt.code === round.correct.code)
                }}
              >
                {opt.name}
              </button>
            )
          })}
        </div>

        {revealed && (
          <>
            <div className="factbox" style={{ textAlign: 'left' }}>
              {gotIt ? '✅ Riktig! ' : `💡 Dette var flagget til ${round.correct.name}. `}
              Bilskilt-koden er «{round.correct.code}» – se om du finner en slik bil også!
            </div>
            <button className="primary" onClick={next}>
              Nytt flagg 🚩
            </button>
          </>
        )}
      </div>
    </>
  )
}
