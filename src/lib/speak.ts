import { getCountry } from '../data/countryDB'

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

// Speak a country's greeting out loud using the device's built-in voices
// (Web Speech API – works offline once the OS voice is installed).
export function speakGreeting(id: string) {
  if (!canSpeak()) return
  const country = getCountry(id)
  if (!country) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(country.speechPhrase)
    u.lang = country.speechLang
    u.rate = 0.85
    const base = country.speechLang.split('-')[0].toLowerCase()
    const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith(base))
    if (voice) u.voice = voice
    window.speechSynthesis.speak(u)
  } catch {
    /* ignore */
  }
}
