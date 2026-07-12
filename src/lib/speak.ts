// Speak a country's greeting out loud using the device's built-in voices
// (Web Speech API – works offline once the OS voice is installed).
const LANGS: Record<string, { lang: string; phrase: string }> = {
  no: { lang: 'nb-NO', phrase: 'Hei' },
  dk: { lang: 'da-DK', phrase: 'Hej' },
  de: { lang: 'de-DE', phrase: 'Hallo' },
  be: { lang: 'nl-BE', phrase: 'Hallo' },
  lu: { lang: 'fr-FR', phrase: 'Moien' },
  fr: { lang: 'fr-FR', phrase: 'Bonjour' },
  ch: { lang: 'de-CH', phrase: 'Grüezi' },
  li: { lang: 'de-DE', phrase: 'Hoi' },
  it: { lang: 'it-IT', phrase: 'Ciao' },
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speakGreeting(id: string) {
  if (!canSpeak()) return
  const entry = LANGS[id]
  if (!entry) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(entry.phrase)
    u.lang = entry.lang
    u.rate = 0.85
    const base = entry.lang.split('-')[0].toLowerCase()
    const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith(base))
    if (voice) u.voice = voice
    window.speechSynthesis.speak(u)
  } catch {
    /* ignore */
  }
}
