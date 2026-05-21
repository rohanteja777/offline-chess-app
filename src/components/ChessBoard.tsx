"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

type ChessBoardProps = {
  position: string;
  boardOrientation: "white" | "black";
  onDrop: (sourceSquare: string, targetSquare: string) => boolean;
  /** When false, legal-move highlights are hidden (checkmate, draw, etc.). */
  canPlay?: boolean;
};

const SELECTED_STYLE: React.CSSProperties = {
  background: "rgba(59, 130, 246, 0.45)"
};

const LEGAL_DOT_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(circle, rgba(59, 130, 246, 0.95) 18%, transparent 19%)",
  borderRadius: "50%"
};

const CAPTURE_RING_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(circle, transparent 58%, rgba(59, 130, 246, 0.55) 58%, rgba(59, 130, 246, 0.55) 68%, transparent 69%)",
  borderRadius: "50%"
};

export default function ChessBoard({
  position,
  boardOrientation,
  onDrop,
  canPlay = true
}: ChessBoardProps) {
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<
    Record<string, React.CSSProperties>
  >({});

  const clearHighlights = useCallback(() => {
    setMoveFrom(null);
    setOptionSquares({});
  }, []);

  // Clear dots after a move, undo, or new game (FEN changes).
  useEffect(() => {
    clearHighlights();
  }, [position, clearHighlights]);

  const showLegalMoves = useCallback(
    (square: Square) => {
      if (!canPlay) return false;

      const game = new Chess(position);
      const piece = game.get(square);

      // Only highlight when selecting the side to move.
      if (!piece || piece.color !== game.turn()) {
        clearHighlights();
        return false;
      }

      const moves = game.moves({ square, verbose: true });
      if (moves.length === 0) {
        clearHighlights();
        return false;
      }

      const styles: Record<string, React.CSSProperties> = {
        [square]: SELECTED_STYLE
      };

      for (const move of moves) {
        const targetPiece = game.get(move.to);
        const isCapture = Boolean(
          targetPiece && targetPiece.color !== piece.color
        );
        styles[move.to] = isCapture ? CAPTURE_RING_STYLE : LEGAL_DOT_STYLE;
      }

      setOptionSquares(styles);
      setMoveFrom(square);
      return true;
    },
    [position, canPlay, clearHighlights]
  );

  const tryMove = useCallback(
    (from: Square, to: Square): boolean => {
      const moved = onDrop(from, to);
      if (moved) clearHighlights();
      return moved;
    },
    [onDrop, clearHighlights]
  );

  const handleSquareClick = useCallback(
    (square: Square) => {
      if (!canPlay) return;

      if (!moveFrom) {
        showLegalMoves(square);
        return;
      }

      if (moveFrom === square) {
        clearHighlights();
        return;
      }

      const game = new Chess(position);
      const legal = game.moves({ square: moveFrom, verbose: true });
      const isLegalTarget = legal.some((m) => m.to === square);

      if (isLegalTarget) {
        tryMove(moveFrom, square);
        return;
      }

      showLegalMoves(square);
    },
    [canPlay, moveFrom, position, showLegalMoves, clearHighlights, tryMove]
  );

  const handlePieceDragBegin = useCallback(
    (_piece: string, sourceSquare: Square) => {
      showLegalMoves(sourceSquare);
    },
    [showLegalMoves]
  );

  const handleDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      const moved = onDrop(sourceSquare, targetSquare);
      clearHighlights();
      return moved;
    },
    [onDrop, clearHighlights]
  );

  const customSquareStyles = useMemo(
    () => optionSquares,
    [optionSquares]
  );

  return (
    <div className="w-full max-w-[560px] rounded-2xl bg-panel p-3 shadow-soft">
      <Chessboard
        id="offline-chess-board"
        position={position}
        boardOrientation={boardOrientation}
        onPieceDrop={handleDrop}
        onPieceDragBegin={handlePieceDragBegin}
        onSquareClick={handleSquareClick}
        customSquareStyles={customSquareStyles}
        customDarkSquareStyle={{ backgroundColor: "#4b5563" }}
        customLightSquareStyle={{ backgroundColor: "#d1d5db" }}
        arePiecesDraggable={canPlay}
      />
    </div>
  );
}
