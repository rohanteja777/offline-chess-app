"use client";

type GameControlsProps = {
  onNewGame: () => void;
  onUndoMove: () => void;
  onFlipBoard: () => void;
  canUndo: boolean;
};

const baseButtonStyle =
  "rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150";

export default function GameControls({
  onNewGame,
  onUndoMove,
  onFlipBoard,
  canUndo
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onNewGame}
        className={`${baseButtonStyle} bg-accent text-white hover:bg-blue-500`}
      >
        New Game
      </button>
      <button
        type="button"
        onClick={onUndoMove}
        disabled={!canUndo}
        className={`${baseButtonStyle} bg-slate-700 text-slate-100 hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        Undo Move
      </button>
      <button
        type="button"
        onClick={onFlipBoard}
        className={`${baseButtonStyle} bg-slate-700 text-slate-100 hover:bg-slate-600`}
      >
        Flip Board
      </button>
    </div>
  );
}
