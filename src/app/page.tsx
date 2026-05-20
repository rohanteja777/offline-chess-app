"use client";

import ChessBoard from "@/components/ChessBoard";
import GameControls from "@/components/GameControls";
import MoveHistory from "@/components/MoveHistory";
import { useChessGame } from "@/hooks/useChessGame";
import { statusLabel } from "@/lib/gameStatus";
import { Square } from "chess.js";

export default function HomePage() {
  const {
    fen,
    turn,
    gameStatus,
    boardOrientation,
    moveHistory,
    canUndo,
    soundOn,
    makeMove,
    newGame,
    undoMove,
    flipBoard,
    toggleSound
  } = useChessGame();

  const handleDrop = (sourceSquare: string, targetSquare: string): boolean => {
    return makeMove(sourceSquare as Square, targetSquare as Square);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
        <section className="flex w-full max-w-[560px] flex-col gap-4">
          <div className="rounded-2xl bg-panel p-4 shadow-soft">
            <h1 className="text-2xl font-semibold text-slate-100">Offline Chess</h1>
            <p className="mt-1 text-sm text-slate-300">Turn: {turn}</p>
            <p className="text-sm text-slate-300">Status: {statusLabel[gameStatus]}</p>
          </div>

          <ChessBoard
            position={fen}
            boardOrientation={boardOrientation}
            onDrop={handleDrop}
          />

          <GameControls
            onNewGame={newGame}
            onUndoMove={undoMove}
            onFlipBoard={flipBoard}
            onToggleSound={toggleSound}
            canUndo={canUndo}
            soundOn={soundOn}
          />
        </section>

        <MoveHistory moves={moveHistory} />
      </div>
    </main>
  );
}
