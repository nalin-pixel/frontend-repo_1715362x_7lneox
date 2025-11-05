import { useState } from "react";
import { Upload, Wand2, User, PackageSearch, Loader2 } from "lucide-react";

export default function GeneratorForm({ onGenerate }) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("Minimal studio");
  const [mode, setMode] = useState("product"); // 'product' | 'model'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result?.toString() || null);
    reader.readAsDataURL(file);
  };

  const simulateGenerate = async () => {
    setLoading(true);
    // Simulate latency
    await new Promise((r) => setTimeout(r, 1400));
    // Create 4 mock image URLs (placeholder). In a real app, replace with backend call.
    const base = mode === "model" ? "https://images.unsplash.com/photo-1554151228-14d9def656e4" : "https://images.unsplash.com/photo-1523275335684-37898b6baf30";
    const variants = [
      `${base}?auto=format&fit=crop&w=900&q=80` ,
      `${base}?auto=format&fit=crop&w=900&q=70` ,
      `${base}?auto=format&fit=crop&w=900&q=60` ,
      `${base}?auto=format&fit=crop&w=900&q=50` ,
    ];
    onGenerate({
      productName,
      description,
      style,
      mode,
      imagePreview,
      results: variants,
    });
    setLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    simulateGenerate();
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nama Produk
              </label>
              <div className="relative">
                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Contoh: Sneakers putih minimalis"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  required
                />
                <PackageSearch className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Deskripsi / Prompt
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsikan gaya, suasana, warna, latar, dsb."
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gaya Latar
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option>Minimal studio</option>
                  <option>Outdoor natural</option>
                  <option>Bold colorful</option>
                  <option>Luxurious</option>
                  <option>Monochrome</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mode Output
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("product")}
                    className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                      mode === "product"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/40 dark:text-indigo-200"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    <PackageSearch className="h-4 w-4" /> Produk saja
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("model")}
                    className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                      mode === "model"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/40 dark:text-indigo-200"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    <User className="h-4 w-4" /> Dengan model
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Gambar Produk (opsional)
            </label>
            <div className="flex h-full items-center justify-center">
              <div className="w-full">
                <div className="group relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-white/60 ring-indigo-200 transition hover:border-indigo-400 hover:bg-indigo-50/40 focus-within:border-indigo-500 focus-within:ring dark:border-gray-700 dark:bg-gray-800/60">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                      <Upload className="mb-2 h-6 w-6" />
                      <p className="text-sm font-medium">Upload foto produk</p>
                      <p className="text-xs">PNG, JPG hingga 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Gunakan gambar referensi produk untuk hasil yang lebih akurat.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Hasil menggunakan AI generatif. Hindari materi berhak cipta.
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Menghasilkan...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  Generate Foto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
