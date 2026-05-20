"use client";

import { Move } from "chess.js";

type MoveHistoryProps = {
  moves: Move[];
};

export default function MoveHistory({ moves }: MoveHistoryProps) {
  return (
    <aside className="w-full rounded-2xl bg-panel p-4 shadow-soft lg:max-w-xs">
      <h2 className="mb-3 text-lg font-semibold text-slate-100">Move History</h2>
      {moves.length === 0 ? (
        <p className="text-sm text-slate-400">No moves yet.</p>
      ) : (
        <div className="grid max-h-[420px] grid-cols-2 gap-2 overflow-y-auto pr-1 text-sm">
          {Array.from({ length: Math.ceil(moves.length / 2) }).map((_, index) => {
            const whiteMove = moves[index * 2];
            const blackMove = moves[index * 2 + 1];
            return (
              <div
                key={`${whiteMove.san}-${index}`}
                className="col-span-2 grid grid-cols-[40px_1fr_1fr] gap-2 rounded-md bg-slate-800/70 p-2"
              >
                <span className="text-slate-400">{index + 1}.</span>
                <span className="text-slate-100">{whiteMove?.san ?? "-"}</span>
                <span className="text-slate-100">{blackMove?.san ?? "-"}</span>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}
