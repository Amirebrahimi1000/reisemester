# 🚗 Reisemester

En morsom og lærerik **offline reise-app** for bilturer – laget spesielt for en
nysgjerrig 10-åring (og resten av familien). Første tur: Skien → Gardasjøen.

Appen fungerer 100 % offline i bilen når den først er lastet inn, og er en
installerbar PWA (kan legges til på hjemskjermen på telefon/nettbrett).

> 🌍 **Live:** https://amirebrahimi1000.github.io/gardaturen/
> Åpne lenka på nettbrettet/telefonen mens dere har nett, og velg
> «Legg til på hjemskjerm» – da er den klar for offline-bruk i bilen.

## Hva er med?

| Aktivitet | Beskrivelse |
|-----------|-------------|
| 🎯 **Reisebingo** | 5 temakort (Norge, Danmark, Tyskland, Alpene, Italia) med ting å se etter ut av bilvinduet |
| ❓ **Quiz** | 6 temaer med spørsmål om landene på ruten – morsom fakta på hvert svar |
| 🌍 **Grenseland** | Lås opp hemmelige fakta om hvert land når dere krysser grensen |
| 🏆 **Oppdrag** | 15 kreative utfordringer (tell lastebiler, lær å telle på tysk, lag et dikt …) |
| 🚗 **Skiltjakt** | Samle nasjonalitetskoder fra bilskilt i hele Europa |
| ⭐ **Reise-o-meter** | Jo flere stjerner dere samler, jo lenger kjører bilen mot Gardasjøen |

All framgang lagres automatisk i nettleseren (`localStorage`) – ingen konto,
ingen internett, ingen datainnsamling.

## Kom i gang

```bash
npm install
npm run dev        # utviklingsserver på http://localhost:5199
```

## Bygg og bruk offline i bilen

```bash
npm run build      # lager en ferdig app i mappa dist/
npm run preview    # test den ferdige appen lokalt
```

**Slik gjør appen klar for bilturen:**

1. Legg `dist/` ut på en gratis statisk vert (f.eks. **Vercel**, **Netlify**
   eller **GitHub Pages**), eller åpne appen på nettverket hjemme.
2. Åpne appen på datteras telefon/nettbrett **mens dere har internett**.
3. Velg «Legg til på hjemskjerm» i nettleseren. Nå er hele appen bufret –
   den fungerer selv uten dekning oppe i Alpene. 🏔️

## Legge til mer innhold

Alt innholdet ligger som enkle lister i `src/data/` – lett å utvide:

- `bingo.ts` – bingokort og ruter
- `quiz.ts` – spørsmål og fakta
- `countries.ts` – land, flagg og fakta
- `missions.ts` – oppdrag
- `plates.ts` – bilnasjonalitetskoder

## Teknologi

Vite + React + TypeScript, PWA via `vite-plugin-pwa` (Workbox precache).
Ingen backend – alt kjører i nettleseren.

God tur! 🇳🇴 → 🇩🇰 → 🇩🇪 → 🇨🇭 → 🇮🇹 🏖️
