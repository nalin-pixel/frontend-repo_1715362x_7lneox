import { Steps } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2">
          <Steps className="h-5 w-5 text-indigo-600" />
          <h3 className="text-base font-semibold">Cara kerja</h3>
        </div>
        <ol className="mt-4 grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <li className="rounded-xl border border-gray-200 p-4">
            1) Tulis nama, deskripsi, dan pilih gaya foto.
          </li>
          <li className="rounded-xl border border-gray-200 p-4">
            2) Aktifkan opsi referensi dan unggah foto produk.
          </li>
          <li className="rounded-xl border border-gray-200 p-4">
            3) Klik Generate untuk membuat beberapa variasi yang konsisten.
          </li>
        </ol>
      </div>
    </section>
  );
}
