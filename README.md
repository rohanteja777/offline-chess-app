# Offline Chess

A modern offline-style chess web app built with Next.js 15, TypeScript, Tailwind CSS, `chess.js`, and `react-chessboard`.

## Live demo

https://offline-chess-rohanteja.vercel.app

## Features

- Drag-and-drop legal moves only
- Turn indicator and game status (check, checkmate, draw, stalemate)
- New Game, Undo Move, Flip Board
- Move history panel
- Chess.com-style move sounds (volume 0.6, mute toggle)
- Responsive, minimal UI

## Move sounds (optional MP3 pack)

The app uses wooden tap sounds offline by default. For closer Chess.com/Lichess clips, run once:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/download-sounds.ps1
```

This downloads open-source Lichess standard sounds into `public/sounds/`.

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- chess.js (rules + state)
- react-chessboard (board UI)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy

Push to GitHub; Vercel auto-deploys on push.
