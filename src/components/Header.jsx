import { Camera, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white grid place-items-center shadow-md">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">ProdukGen</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Generator foto produk konsisten dengan referensi</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 border border-emerald-200">
            <Sparkles className="h-3.5 w-3.5" /> Konsistensi via gambar referensi
          </span>
        </div>
      </div>
    </header>
  );
}
