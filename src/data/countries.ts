// Backwards-compatible re-exports. Country data now lives in countryDB.ts and
// the *active trip* (via useStore().routeCountries) decides which countries and
// in what order are shown.
export type { Country } from './countryDB'
export { COUNTRY_DB, getCountry, ALL_COUNTRIES } from './countryDB'
