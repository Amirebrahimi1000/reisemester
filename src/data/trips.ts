import { COUNTRY_DB } from './countryDB'

export interface Place {
  name: string
  lat: number
  lon: number
}

export interface Trip {
  id: string
  name: string
  emoji: string
  from: Place
  to: Place
  countryIds: string[] // in driving order
  goalStars: number
  builtIn?: boolean
}

// Built-in trips shipped with the app.
export const BUILTIN_TRIPS: Trip[] = [
  {
    id: 'ned',
    name: 'Ned til Gardasjøen',
    emoji: '🏖️',
    from: { name: 'Skien', lat: 59.21, lon: 9.61 },
    to: { name: 'Gardasjøen', lat: 45.44, lon: 10.56 },
    countryIds: ['no', 'dk', 'de', 'be', 'lu', 'fr', 'ch', 'li', 'it'],
    goalStars: 320,
    builtIn: true,
  },
  {
    id: 'hjem',
    name: 'Hjem fra Gardasjøen',
    emoji: '🏠',
    from: { name: 'Gardasjøen', lat: 45.44, lon: 10.56 },
    to: { name: 'Skien', lat: 59.21, lon: 9.61 },
    countryIds: ['it', 'ch', 'de', 'dk', 'no'],
    goalStars: 220,
    builtIn: true,
  },
]

// Resolve a trip's country ids to full Country objects (skips unknown ids).
export function tripCountries(trip: Trip) {
  return trip.countryIds.map((id) => COUNTRY_DB[id]).filter(Boolean)
}

// A sensible star goal for a freshly built trip.
export function suggestGoal(countryCount: number): number {
  return Math.max(120, 140 + countryCount * 20)
}
