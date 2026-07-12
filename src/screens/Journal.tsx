import { useState } from 'react'
import { useStore } from '../store'
import type { JournalEntry } from '../store'

const MOODS = ['😀', '😃', '😎', '🤩', '😴', '🤢', '🥱', '😍']

const PROMPTS = [
  'Hva var det morsomste du så i dag?',
  'Hvilket land likte du best så langt – og hvorfor?',
  'Hva spiste dere i dag?',
  'Så du noe rart eller kult ut av vinduet?',
  'Hva gleder du deg mest til?',
]

// Build a readable text version of the whole journal, oldest entry first.
function buildText(entries: JournalEntry[], name: string): string {
  const who = name ? `${name} sin reise til Gardasjøen` : 'Reise til Gardasjøen'
  const line = '='.repeat(40)
  const sep = '-'.repeat(40)
  const header = `Reisedagbok – Reisemester\n${who}\n${line}\n\n`
  const body = [...entries]
    .reverse() // stored newest-first → export oldest-first (chronological)
    .map((e) => `${e.date}   ${e.country} ${e.mood}\n\n${e.text}\n\n${sep}\n`)
    .join('\n')
  return header + body
}

export default function Journal() {
  const { state, addJournal, deleteJournal, routeCountries } = useStore()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [mood, setMood] = useState('😀')
  const [country, setCountry] = useState(routeCountries[0]?.flag ?? '🇳🇴')
  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)])
  const [copied, setCopied] = useState(false)

  const save = () => {
    if (!text.trim()) return
    addJournal({ text: text.trim(), mood, country })
    setText('')
    setMood('😀')
    setOpen(false)
  }

  const exportFile = () => {
    const blob = new Blob([buildText(state.journal, state.playerName)], {
      type: 'text/plain;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'reisedagbok-gardaturen.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(buildText(state.journal, state.playerName))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('Kunne ikke kopiere automatisk. Prøv «Last ned» i stedet.')
    }
  }

  return (
    <>
      <h2 className="screen-title">📔 Reisedagbok</h2>
      <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
        Skriv om dagen i bilen! Hver side gir ⭐⭐⭐ på denne turen. Dagboka er alltid her og
        beholdes som et minne selv når dere nullstiller for en ny tur.
      </p>

      {!open && (
        <button className="primary" style={{ marginTop: 0 }} onClick={() => setOpen(true)}>
          ✏️ Skriv ny dagbokside
        </button>
      )}

      {!open && state.journal.length > 0 && (
        <div className="export-row">
          <button className="backbtn" style={{ marginTop: 0 }} onClick={exportFile}>
            📤 Last ned
          </button>
          <button className="backbtn" style={{ marginTop: 0 }} onClick={copyAll}>
            {copied ? '✅ Kopiert!' : '📋 Kopier alt'}
          </button>
        </div>
      )}

      {open && (
        <div className="card" style={{ marginTop: 4 }}>
          <p style={{ fontWeight: 800, marginTop: 0 }}>{prompt}</p>

          <div className="subtle" style={{ marginBottom: 4 }}>
            Hvordan har dagen vært?
          </div>
          <div className="picker">
            {MOODS.map((m) => (
              <button
                key={m}
                className={`pick ${mood === m ? 'on' : ''}`}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="subtle" style={{ margin: '10px 0 4px' }}>
            Hvilket land er dere i?
          </div>
          <div className="picker">
            {routeCountries.map((c) => (
              <button
                key={c.id}
                className={`pick ${country === c.flag ? 'on' : ''}`}
                onClick={() => setCountry(c.flag)}
              >
                {c.flag}
              </button>
            ))}
          </div>

          <textarea
            className="journal-input"
            placeholder="Skriv her …"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            autoFocus
          />

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="primary"
              style={{ marginTop: 0 }}
              disabled={!text.trim()}
              onClick={save}
            >
              Lagre 💾
            </button>
            <button
              className="backbtn"
              style={{ marginTop: 0 }}
              onClick={() => {
                setOpen(false)
                setText('')
              }}
            >
              Avbryt
            </button>
          </div>
        </div>
      )}

      {state.journal.length === 0 && !open && (
        <div className="card" style={{ marginTop: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>📝</div>
          <p className="subtle">Ingen dagboksider ennå. Trykk på knappen og skriv den første!</p>
        </div>
      )}

      {state.journal.map((e) => (
        <div key={e.id} className="card journal-entry">
          <div className="journal-head">
            <span className="journal-flag">{e.country}</span>
            <span className="journal-mood">{e.mood}</span>
            <span className="journal-date">{e.date}</span>
            <button
              className="journal-del"
              onClick={() => {
                if (confirm('Slette denne dagboksiden?')) deleteJournal(e.id)
              }}
            >
              🗑️
            </button>
          </div>
          <p className="journal-text">{e.text}</p>
        </div>
      ))}
    </>
  )
}
