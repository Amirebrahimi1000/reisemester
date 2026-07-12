import { useState } from 'react'
import type { ComponentType } from 'react'
import Flags from './Flags'
import Memory from './Memory'
import Reaction from './Reaction'
import DistanceGuess from './DistanceGuess'
import CapitalGame from './CapitalGame'
import PlateMath from './PlateMath'
import Anagram from './Anagram'
import RouteOrder from './RouteOrder'
import WordSearch from './WordSearch'

interface Game {
  id: string
  emoji: string
  name: string
  desc: string
  two: boolean // supports two players
  C: ComponentType
}

const GAMES: Game[] = [
  { id: 'flagg', emoji: '🚩', name: 'Gjett landet', desc: 'Kjenn igjen flaggene fra Europa', two: true, C: Flags },
  { id: 'hovedstad', emoji: '🏛️', name: 'Hovedstad-spillet', desc: 'Hvilken by er hovedstaden?', two: true, C: CapitalGame },
  { id: 'husk', emoji: '🧠', name: 'Husk-spillet', desc: 'Finn parene – memory med reise-symboler', two: true, C: Memory },
  { id: 'reaksjon', emoji: '⚡', name: 'Reaksjonstest', desc: 'Trykk når skjermen blir grønn', two: true, C: Reaction },
  { id: 'avstand', emoji: '📏', name: 'Gjett avstanden', desc: 'Hvem gjetter nærmest?', two: true, C: DistanceGuess },
  { id: 'skiltmatte', emoji: '🔢', name: 'Skilt-matte', desc: 'Regn ut tallene på skiltet', two: true, C: PlateMath },
  { id: 'anagram', emoji: '🔀', name: 'Vri på ordet', desc: 'Stokk bokstavene til et ord', two: true, C: Anagram },
  { id: 'ordsok', emoji: '🔤', name: 'Ordsøk', desc: 'Finn de skjulte reise-ordene', two: false, C: WordSearch },
  { id: 'rute', emoji: '🗺️', name: 'Reiseruta', desc: 'Sett landene i riktig rekkefølge', two: false, C: RouteOrder },
]

export default function Games() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = GAMES.find((g) => g.id === openId)

  if (!open) {
    return (
      <>
        <h2 className="screen-title">🎮 Minispill</h2>
        <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
          Spill så mye du vil – perfekt når veien blir lang! 👥 = kan spilles to sammen.
        </p>
        {GAMES.map((g) => (
          <button key={g.id} className="row-item" onClick={() => setOpenId(g.id)}>
            <span className="ricon">{g.emoji}</span>
            <span style={{ flex: 1 }}>
              <div className="rtitle">
                {g.name} {g.two && <span className="twoplayer-badge">👥 2</span>}
              </div>
              <div className="rdesc">{g.desc}</div>
            </span>
            <span style={{ fontSize: 22, color: 'var(--muted)' }}>▶</span>
          </button>
        ))}
      </>
    )
  }

  const Game = open.C
  return (
    <>
      <button className="backbtn" onClick={() => setOpenId(null)}>
        ← Minispill
      </button>
      <div style={{ marginTop: 10 }}>
        <Game />
      </div>
    </>
  )
}
