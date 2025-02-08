"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearch } from "./context/SearchContext";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import Breadcrumb from "./components/Breadcrumb";

export default function Home() {
  const { setIsSearchOpen } = useSearch();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-8 pt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center font-montserrat">
              Apa yang ingin Anda cari?
            </h1>
            
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full max-w-2xl mx-auto flex items-center gap-2 px-4 py-3 text-left text-gray-500 
                bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                hover:border-gray-300 dark:hover:border-gray-600 transition-colors
                shadow-sm"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>Cari apa saja... (Ctrl + K)</span>
            </button>
            
            <div className="w-full pt-8 pb-24">
              <SearchHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
