"use client";

import { Chessboard } from "react-chessboard";

type ChessBoardProps = {
  position: string;
  boardOrientation: "white" | "black";
  onDrop: (sourceSquare: string, targetSquare: string) => boolean;
};

export default function ChessBoard({
  position,
  boardOrientation,
  onDrop
}: ChessBoardProps) {
  return (
    <div className="w-full max-w-[560px] rounded-2xl bg-panel p-3 shadow-soft">
      <Chessboard
        id="offline-chess-board"
        position={position}
        boardOrientation={boardOrientation}
        onPieceDrop={onDrop}
        customDarkSquareStyle={{ backgroundColor: "#4b5563" }}
        customLightSquareStyle={{ backgroundColor: "#d1d5db" }}
      />
    </div>
  );
}
