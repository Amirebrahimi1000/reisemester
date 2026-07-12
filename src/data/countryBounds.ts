import { COUNTRY_DB } from './countryDB'

// Offline "which country am I in?" detection using the lat/lon boxes stored in
// the country database. Boxes overlap (small countries sit inside big ones), so
// we pick the tightest-fitting box among the candidate countries.
export function detectCountry(lat: number, lon: number, candidateIds: string[]): string | null {
  const hits = candidateIds
    .map((id) => COUNTRY_DB[id])
    .filter((c) => c && lat >= c.latMin && lat <= c.latMax && lon >= c.lonMin && lon <= c.lonMax)
  if (hits.length === 0) return null
  hits.sort(
    (a, b) =>
      (a.latMax - a.latMin) * (a.lonMax - a.lonMin) - (b.latMax - b.latMin) * (b.lonMax - b.lonMin),
  )
  return hits[0].id
}
