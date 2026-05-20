"use client";

import { useCallback, useMemo, useState } from "react";
import { Chess, Color, Move, Square } from "chess.js";

export type GameStatus =
  | "ongoing"
  | "check"
  | "checkmate"
  | "draw"
  | "stalemate";

const getStatus = (game: Chess): GameStatus => {
  if (game.isCheckmate()) return "checkmate";
  if (game.isStalemate()) return "stalemate";
  if (game.isDraw()) return "draw";
  if (game.isCheck()) return "check";
  return "ongoing";
};

const formatTurn = (turn: Color) => (turn === "w" ? "White" : "Black");

export function useChessGame() {
  const [game, setGame] = useState(() => new Chess());
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );

  const makeMove = useCallback((from: Square, to: Square): boolean => {
    let moveMade = false;

    setGame((currentGame) => {
      // Clone state before mutating so React gets a new object reference.
      const nextGame = new Chess(currentGame.fen());
      const move = nextGame.move({ from, to, promotion: "q" });

      if (move) {
        moveMade = true;
      }

      return nextGame;
    });

    return moveMade;
  }, []);

  const newGame = useCallback(() => {
    setGame(new Chess());
  }, []);

  const undoMove = useCallback(() => {
    setGame((currentGame) => {
      const nextGame = new Chess(currentGame.fen());
      nextGame.undo();
      return nextGame;
    });
  }, []);

  const flipBoard = useCallback(() => {
    setBoardOrientation((prev) => (prev === "white" ? "black" : "white"));
  }, []);

  const moveHistory = useMemo<Move[]>(() => game.history({ verbose: true }), [game]);
  const gameStatus = useMemo(() => getStatus(game), [game]);

  return {
    fen: game.fen(),
    turn: formatTurn(game.turn()),
    gameStatus,
    boardOrientation,
    moveHistory,
    canUndo: moveHistory.length > 0,
    makeMove,
    newGame,
    undoMove,
    flipBoard
  };
}
