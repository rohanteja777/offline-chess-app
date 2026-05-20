import { GameStatus } from "@/hooks/useChessGame";

export const statusLabel: Record<GameStatus, string> = {
  ongoing: "Game in progress",
  check: "Check",
  checkmate: "Checkmate",
  draw: "Draw",
  stalemate: "Stalemate"
};
