import { Sparkles, Camera, Wand2 } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                ProductShot AI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Generate stunning product photos in seconds
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:ring-indigo-800">
              <Wand2 className="h-4 w-4" /> AI-powered
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800">
              <Camera className="h-4 w-4" /> Studio quality
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
