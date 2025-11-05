import { useState } from 'react';
import Header from './components/Header.jsx';
import GeneratorForm from './components/GeneratorForm.jsx';
import OutputGallery from './components/OutputGallery.jsx';
import HowItWorks from './components/HowItWorks.jsx';

function App() {
  const [session, setSession] = useState(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.08),transparent_40%)]">
      <Header />

      <main className="pt-4">
        <section className="mx-auto max-w-6xl px-4 py-10 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Hasil foto produk yang konsisten dengan referensi Anda
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Unggah foto produk sebagai referensi agar bentuk dan warnanya tetap konsisten. Pilih gaya dan mode untuk memvariasikan adegan tanpa mengubah identitas produk.
          </p>
        </section>

        <GeneratorForm onGenerate={setSession} />

        {session?.images?.length > 0 && (
          <OutputGallery session={session} />
        )}

        <HowItWorks />
      </main>

      <footer className="border-t border-gray-200/60 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} ProdukGen</p>
          <p>Demo – hasil AI belum terhubung</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
