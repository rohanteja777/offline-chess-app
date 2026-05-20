const STORAGE_KEY = "offline-chess-game";

export type SavedGameState = {
  fen: string;
  boardOrientation: "white" | "black";
};

export function loadSavedGame(): SavedGameState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SavedGameState;
    if (!parsed.fen || !parsed.boardOrientation) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveGame(state: SavedGameState): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota/private-mode errors.
  }
}

export function clearSavedGame(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
