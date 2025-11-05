import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, PlayCircle, AlertCircle } from 'lucide-react';

export default function GeneratorForm({ onGenerate }) {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('Studio minimalis');
  const [mode, setMode] = useState('product');
  const [useReference, setUseReference] = useState(true);
  const [refPreview, setRefPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Silakan unggah file gambar yang valid.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setRefPreview(reader.result?.toString() || '');
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (useReference && !refPreview) {
      setError('Untuk hasil konsisten, unggah gambar referensi produk Anda.');
      return;
    }

    if (!productName.trim()) {
      setError('Nama produk tidak boleh kosong.');
      return;
    }

    setLoading(true);

    const prompt = `${description || 'Foto produk profesional'} | Gaya: ${style} | Mode: ${mode === 'product' ? 'Produk saja' : 'Dengan model'} | Konsisten dengan referensi`;

    // Simulasi proses generate dengan konsistensi dari referensi
    await new Promise((r) => setTimeout(r, 1200));

    const makePlaceholder = (idx) =>
      `https://images.unsplash.com/photo-15${idx}0?auto=format&fit=crop&w=1200&q=60`;

    const images = useReference && refPreview
      ? [refPreview, refPreview, refPreview, refPreview]
      : [1, 2, 3, 4].map((i) => makePlaceholder(i));

    onGenerate({
      productName,
      description,
      style,
      mode,
      useReference,
      refImageUrl: refPreview || null,
      images,
      prompt,
    });

    setLoading(false);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama produk</label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Contoh: Botol minum stainless"
                className="mt-1 w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi & detail</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Warna, material, mood pencahayaan, properti, dsb."
                rows={3}
                className="mt-1 w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gaya</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="mt-1 w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option>Studio minimalis</option>
                  <option>Flatlay editorial</option>
                  <option>Lifestyle hangat</option>
                  <option>High-contrast dramatis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mode</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('product')}
                    className={`rounded-xl border px-3 py-2 text-sm ${mode === 'product' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    Produk saja
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('model')}
                    className={`rounded-xl border px-3 py-2 text-sm ${mode === 'model' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    Dengan model
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-indigo-600" />
                  <p className="text-sm font-medium">Gunakan gambar referensi</p>
                </div>
                <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useReference}
                    onChange={(e) => setUseReference(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Aktif
                </label>
              </div>

              {useReference && (
                <div className="mt-3 grid sm:grid-cols-[1fr,auto] gap-3 items-center">
                  <div className="relative overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">
                    {refPreview ? (
                      <img src={refPreview} alt="Referensi" className="w-full h-52 object-contain p-3" />
                    ) : (
                      <div className="h-52 grid place-items-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-5 w-5" />
                          <p className="text-sm">Seret & taruh gambar di sini atau klik unggah</p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileRef}
                      onChange={(e) => handleFile(e.target.files?.[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="h-11 inline-flex items-center gap-2 rounded-xl bg-white border border-gray-300 px-4 text-sm font-medium hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4" /> Unggah
                  </button>
                </div>
              )}

              <p className="mt-2 text-xs text-gray-500">
                Tip: Hasil paling konsisten jika referensi ber-background polos dan produk jelas terlihat.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-amber-800">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-white font-medium shadow hover:bg-indigo-700 disabled:opacity-60"
              >
                <PlayCircle className="h-5 w-5" />
                {loading ? 'Menghasilkan…' : 'Generate Foto'}
              </button>
              <p className="text-xs text-gray-500">Tidak ada biaya: ini simulasi untuk meninjau alur dan desain.</p>
            </div>
          </div>
        </form>

        <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-800">Tips mendapatkan hasil konsisten</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc pl-5">
            <li>Selalu aktifkan opsi referensi dan unggah foto produk Anda.</li>
            <li>Gunakan referensi dengan pencahayaan merata dan latar polos.</li>
            <li>Isi detail gaya dan mood agar hasil sesuai branding.</li>
            <li>Untuk mode dengan model, tambahkan deskripsi target demografis.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
