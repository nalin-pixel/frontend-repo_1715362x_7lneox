import { useMemo } from 'react';
import { Download, Clipboard } from 'lucide-react';

export default function OutputGallery({ session }) {
  const { images = [], prompt, refImageUrl, useReference } = session || {};

  const variants = useMemo(() => (
    [
      { name: 'Studio terang', bg: 'bg-white', ring: 'ring-gray-200' },
      { name: 'Bayangan lembut', bg: 'bg-gray-50', ring: 'ring-gray-200' },
      { name: 'Latar gradien', bg: 'bg-gradient-to-br from-indigo-50 to-pink-50', ring: 'ring-indigo-200' },
      { name: 'Backdrop tekstur', bg: 'bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.08),transparent_50%)]', ring: 'ring-pink-200' },
    ]
  ), []);

  const handleDownload = (src) => {
    const a = document.createElement('a');
    a.href = src;
    a.download = 'produk-gen.jpg';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const copyPrompt = async () => {
    if (prompt) await navigator.clipboard.writeText(prompt);
    alert('Prompt disalin.');
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-semibold">Hasil</h2>
        {prompt && (
          <button onClick={copyPrompt} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs hover:bg-gray-50">
            <Clipboard className="h-4 w-4" /> Salin prompt
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((src, idx) => (
          <div key={idx} className={`group rounded-2xl border border-gray-200 overflow-hidden bg-white ring-1 ${variants[idx]?.ring || 'ring-gray-200'}`}>
            <div className={`aspect-square ${variants[idx]?.bg || 'bg-white'} grid place-items-center relative`}>
              {useReference && refImageUrl ? (
                <img src={refImageUrl} alt="Produk" className="max-h-full max-w-full object-contain p-4" />
              ) : (
                <img src={src} alt="Hasil" className="h-full w-full object-cover" />
              )}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-gray-600">
                <span className="rounded-md bg-white/80 backdrop-blur px-2 py-1 border border-gray-200">{variants[idx]?.name}</span>
                <button onClick={() => handleDownload(useReference && refImageUrl ? refImageUrl : src)} className="inline-flex items-center gap-1 rounded-md bg-white/90 backdrop-blur px-2 py-1 border border-gray-200 opacity-0 group-hover:opacity-100 transition">
                  <Download className="h-3.5 w-3.5" /> Unduh
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {useReference && refImageUrl && (
        <p className="mt-4 text-xs text-gray-500">Catatan: Untuk demo, konsistensi disimulasikan dengan menampilkan referensi pada berbagai latar. Integrasi model AI akan mempertahankan bentuk/warna produk sekaligus memvariasikan adegan.</p>
      )}
    </section>
  );
}
