# Hästregistrering — Frontend (React + Vite)

React-webbapp för registrering och hantering av hästar. Responsiv design som fungerar på mobil och desktop.

## Teknik

- **Framework**: React 18 med Vite (snabb build-tool)
- **Styling**: Vanilla CSS med Flexbox/Grid
- **API-kommunikation**: Fetch API med centraliserad felhantering
- **Ingen externa UI-bibliotek**: Ren, lätt att underhålla kod

### Val av teknik

- **React + Vite**: Snabb utvecklingscykel, minimal setup. Vite är mycket snabbare än Create React App.
- **Vanilla CSS**: Ingen styling-bibliotek krävs för denna uppgift. Grid/Flexbox ger full kontroll och responsivitet utan extra dependencies.
- **Centraliserad API-wrapper** (`src/api/horses.js`): Alla API-anrop på ett ställe gör det enkelt att ändra backend-URL eller lägga till felhantering senare.
- **Komponenter med hooks**: Moderna React-mönster (useState, useEffect) istället för klasser. Enklare att förstå och testa.

## Installation och start

### Krav

- Node.js v20+ och npm
- Backend-API måste köra på `http://localhost:5280` (se backend-README)

### Steg

1. **Klona repot** (om du ännu inte gjort det):
   ```powershell
   https://github.com/SandraJonsson73/horse-manager.git
   cd horse-manager
   ```

2. Installera dependencies:
    ```powershell
    npm install
    ```
3. Starta utvecklingsserver:
    ```powershell
    npm run dev
    ```
Appen körs på `http://localhost:5173/`

4. I en annan terminal, starta backend-API:et:
    ```powershell
    cd c:\Users\stall\source\repos\Webbapplikation\horse-manager-api
    dotnet run
    ```
    API:et lyssnar på `http://localhost:5280`

5. Öppna webbläsaren:
    - Gå till `http://localhost:5173/`
    - Du bör se formuläret för att lägga till hästar

## Funktionalitet
### Användarflöde
  1. Lägg till häst: Fyll i formuläret (namn, ras, födelseår, ägare), välj en profilbild och klicka "Lägg till"
  2. Lista hästar: Alla registrerade hästar visas som kort med bild och information
  3. Redigera häst: Klicka "Redigera" på en häst för att ändra dess uppgifter
  4. Filuppladdning: Bilderna (JPG, PNG, GIF, max 5 MB) lagras på backend och visas som thumbnails i listan

### Felhantering
  - Om backend inte svarar visas ett felmeddelande i en röd banner
  - Appen kraschar aldrig — alla API-anrop är wrapped i try/catch
  - Loading-indikator visas medan anrop pågår

### Filstruktur

```text
horse-manager/
├── src/
│   ├── components/
│   │   ├── HorseList.jsx      # Visar lista över hästar
│   │   ├── HorseForm.jsx      # Formulär för lägg till/redigera
│   ├── api/
│   │   └── horses.js          # API-wrapper och felhantering
│   ├── App.jsx                # Huvudkomponent
│   ├── App.css                # Responsiv styling
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styling
├── public/                    # Statiska filer
├── index.html                 # HTML-template
├── vite.config.js             # Vite-konfiguration
└── README.md
```

## Responsivitet
Appen är testad på två breddpunkter:

  - Mobil (~375px): Enkolumns layout, hästar stackade vertikalt
  - Desktop (~1280px): Tvåkolumns layout, formulär på vänster, lista på höger

Testa genom att öppna DevTools (F12) → Toggle device toolbar (mobil-ikon).

## Utveckling
  - **Starta dev-server**: `npm run dev`
  - **Build för produktion**: `npm run build`
  - **Preview av bygget**: `npm run preview`

## Noteringar
  - Frontend förväntar sig att backend körs på `http://localhost:5280` — om du ändrar port måste du uppdatera `API_BASE` i `src/api/horses.js`
  - Bildfiler lagras på backend i `wwwroot/uploads/`
  - Databasen (SQLite) ligger på backend och sparas automatiskt