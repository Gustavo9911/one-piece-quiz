export function SenaiLogo() {
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl font-black uppercase tracking-[0.25em] text-white shadow-inner shadow-black/20">
        S
      </div>
      <div className="leading-tight">
        <div className="text-sm font-black uppercase tracking-[0.25em] text-white">SENAI</div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-blue-100/75">One Piece Quiz</div>
      </div>
    </div>
  );
}
