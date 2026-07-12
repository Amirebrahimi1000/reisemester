import { useState } from 'react'
import { Badges } from '../components/Badges'
import { Diploma } from '../components/Diploma'

export default function Merker() {
  const [showDiploma, setShowDiploma] = useState(false)
  return (
    <>
      <h2 className="screen-title">🏅 Merker & diplom</h2>
      <p className="subtle" style={{ color: '#e0f2fe', margin: '0 4px 12px' }}>
        Samle merker ved å utforske appen – og se reisediplomet ditt!
      </p>
      <Badges />
      <button className="primary" onClick={() => setShowDiploma(true)}>
        🎓 Vis reisediplom
      </button>
      {showDiploma && <Diploma onClose={() => setShowDiploma(false)} />}
    </>
  )
}
