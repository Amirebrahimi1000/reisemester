// Rough latitude/longitude boxes for the route countries, used for OFFLINE
// "which country am I in?" detection from the device GPS. Boxes overlap (small
// countries sit inside big ones), so detectCountry picks the tightest-fitting
// box – that way Luxembourg wins over Germany/France, Liechtenstein over Sveits.
interface LatLonBox {
  id: string
  latMin: number
  latMax: number
  lonMin: number
  lonMax: number
}

const BOXES: LatLonBox[] = [
  { id: 'no', latMin: 57.9, latMax: 71.2, lonMin: 4.5, lonMax: 31.2 },
  { id: 'dk', latMin: 54.5, latMax: 57.8, lonMin: 8.0, lonMax: 12.8 },
  { id: 'de', latMin: 47.2, latMax: 55.1, lonMin: 5.8, lonMax: 15.1 },
  { id: 'be', latMin: 49.5, latMax: 51.5, lonMin: 2.5, lonMax: 6.4 },
  { id: 'lu', latMin: 49.4, latMax: 50.2, lonMin: 5.7, lonMax: 6.55 },
  { id: 'fr', latMin: 42.3, latMax: 51.1, lonMin: -4.8, lonMax: 8.3 },
  { id: 'ch', latMin: 45.8, latMax: 47.8, lonMin: 5.9, lonMax: 10.5 },
  { id: 'li', latMin: 47.05, latMax: 47.28, lonMin: 9.47, lonMax: 9.64 },
  { id: 'it', latMin: 36.6, latMax: 47.1, lonMin: 6.6, lonMax: 18.6 },
]

function area(b: LatLonBox): number {
  return (b.latMax - b.latMin) * (b.lonMax - b.lonMin)
}

// Returns the route-country id containing the point, preferring the tightest
// box; null if the point is outside all route countries.
export function detectCountry(lat: number, lon: number): string | null {
  const hits = BOXES.filter(
    (b) => lat >= b.latMin && lat <= b.latMax && lon >= b.lonMin && lon <= b.lonMax,
  )
  if (hits.length === 0) return null
  hits.sort((a, b) => area(a) - area(b))
  return hits[0].id
}
