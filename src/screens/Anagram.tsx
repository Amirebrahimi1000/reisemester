import { useState } from 'react'
import { useStore } from '../store'

const WORDS: { word: string; hint: string }[] = [
  { word: 'GARDASJØEN', hint: 'Målet for hele turen' },
  { word: 'ELG', hint: 'Skogens konge' },
  { word: 'PIZZA', hint: 'Italiensk rett med ost og tomat' },
  { word: 'FERJE', hint: 'Frakter bilen over vann' },
  { word: 'ALPENE', hint: 'Høye fjell dere kjører gjennom' },
  { word: 'SJOKOLADE', hint: 'Sveits er verdenskjent for dette' },
  { word: 'TUNNEL', hint: 'Vei gjennom et fjell' },
  { word: 'VAFLER', hint: 'Belgia er kjent for disse' },
]

function scramble(word: string): string {
  const letters = word.split('')
  for (let tries = 0; tries < 10; tries++) {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[letters[i], letters[j]] = [letters[j], letters[i]]
    }
    if (letters.join('') !== word) break
  }
  return letters.join(' ')
}

export default function Anagram() {
  const { unlockAchievement } = useStore()
  const [idx, setIdx] = useState(0)
  const [guess, setGuess] = useState('')
  const [solved, setSolved] = useState(false)
  const [shown, setShown] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [scrambled, setScrambled] = useState(() => scramble(WORDS[0].word))

  const item = WORDS[idx]
  const last = idx === WORDS.length - 1

  const check = () => {
    if (guess.trim().toUpperCase().replace(/\s/g, '') === item.word) {
      setSolved(true)
      setCorrectCount((c) => c + 1)
    }
  }

  const next = () => {
    const newIdx = last ? 0 : idx + 1
    if (last) {
      unlockAchievement('anagram')
      setCorrectCount(0)
    }
    setIdx(newIdx)
    setScrambled(scramble(WORDS[newIdx].word))
    setGuess('')
    setSolved(false)
    setShown(false)
  }

  return (
    <div className="card">
      <div className="subtle" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Ord {idx + 1}/{WORDS.length}</span>
        <span style={{ fontWeight: 800 }}>Riktige: {correctCount}</span>
      </div>

      <div className="anagram-word">{scrambled}</div>
      <p className="subtle" style={{ textAlign: 'center', marginTop: 0 }}>
        💡 Hint: {item.hint}
      </p>

      {!solved && !shown && (
        <>
          <input
            className="journal-input"
            placeholder="Skriv ordet …"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            autoCapitalize="characters"
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="primary" style={{ marginTop: 0 }} disabled={!guess.trim()} onClick={check}>
              Sjekk
            </button>
            <button className="backbtn" style={{ marginTop: 0 }} onClick={() => setShown(true)}>
              Vis svar
            </button>
          </div>
          {guess.trim() && guess.trim().toUpperCase().replace(/\s/g, '') !== item.word && (
            <p className="subtle" style={{ textAlign: 'center' }}>Prøv igjen – trykk «Sjekk» 🙂</p>
          )}
        </>
      )}

      {(solved || shown) && (
        <>
          <div className="factbox" style={{ textAlign: 'center' }}>
            {solved ? '✅ Riktig! ' : '💡 Svaret var: '}
            <b>{item.word}</b>
          </div>
          <button className="primary" onClick={next}>
            {last ? '🔁 Spill igjen' : 'Neste ord →'}
          </button>
        </>
      )}
    </div>
  )
}
