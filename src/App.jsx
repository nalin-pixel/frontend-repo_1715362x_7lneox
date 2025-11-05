import { useState } from "react";
import Header from "./components/Header";
import GeneratorForm from "./components/GeneratorForm";
import OutputGallery from "./components/OutputGallery";
import HowItWorks from "./components/HowItWorks";

function App() {
  const [session, setSession] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-fuchsia-50 pb-16">
      <Header />

      <main className="mt-8">
        <section className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl dark:text-gray-100">
            Generator Foto Produk
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Buat foto produk estetik dalam berbagai gaya. Pilih output produk saja atau dengan model.
          </p>
        </section>

        <div className="mt-8">
          <GeneratorForm onGenerate={(data) => setSession(data)} />
        </div>

        {session && (
          <div className="mt-6">
            <OutputGallery session={session} />
          </div>
        )}

        <HowItWorks />
      </main>

      <footer className="mt-12 border-t border-gray-200/70 py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        Dibuat dengan ❤️ untuk membantu UMKM tampil profesional.
      </footer>
    </div>
  );
}

export default App;
