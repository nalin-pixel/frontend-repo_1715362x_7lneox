import { Brush, Image as ImageIcon, Sparkles, Zap } from "lucide-react";

const steps = [
  {
    icon: Brush,
    title: "Masukkan detail",
    desc: "Tuliskan nama produk dan deskripsikan gaya visual yang diinginkan.",
  },
  {
    icon: ImageIcon,
    title: "Upload foto (opsional)",
    desc: "Tambahkan foto produk sebagai referensi agar hasil lebih konsisten.",
  },
  {
    icon: Sparkles,
    title: "Pilih mode",
    desc: "Produk saja atau dipadukan dengan model manusia.",
  },
  {
    icon: Zap,
    title: "Generate",
    desc: "Klik generate dan tunggu hasil muncul dalam hitungan detik.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <div className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-indigo-50/60 p-6 shadow-sm dark:border-gray-800 dark:from-gray-900 dark:to-indigo-950/20">
        <h3 className="mb-6 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
          Cara kerja
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                <s.icon className="h-5 w-5" />
              </div>
              <h4 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">{s.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
