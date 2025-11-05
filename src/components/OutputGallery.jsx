import { useState } from "react";
import { Download, Check, Copy, Sparkles } from "lucide-react";

export default function OutputGallery({ session }) {
  const [copied, setCopied] = useState(false);
  if (!session) return null;

  const download = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `productshot-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const promptText = `${session.productName} — ${session.description || session.style} — mode: ${session.mode}`;

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Hasil Generasi
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {session.mode === "model" ? "Produk dengan model" : "Produk saja"} • Gaya: {session.style}
            </p>
          </div>
          <button
            onClick={copyPrompt}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy prompt
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {session.results.map((url, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-800">
              <img src={url} alt={`Result ${idx + 1}`} className="aspect-square w-full object-cover" />
              <button
                onClick={() => download(url)}
                className="absolute right-2 top-2 hidden rounded-md bg-white/90 px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow group-hover:block dark:bg-gray-900/90 dark:text-gray-200"
              >
                <Download className="mr-1 inline h-3.5 w-3.5" /> Unduh
              </button>
            </div>
          ))}
        </div>

        {session.imagePreview && (
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
            Referensi yang diunggah ditampilkan saat generasi untuk menjaga konsistensi bentuk produk.
          </div>
        )}

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Sparkles className="h-4 w-4" />
          Tips: cobalah variasi prompt seperti "pencahayaan dramatis", "studio putih bersih", atau "dipegang oleh model".
        </div>
      </div>
    </section>
  );
}
