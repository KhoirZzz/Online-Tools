"use client";

import { useEffect, useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { useRouter } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  ClockIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

// Tipe data untuk hasil pencarian
type SearchResult = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'blog' | 'tool' | 'page';
  icon?: React.ReactNode;
};

type SearchHistory = {
  query: string;
  timestamp: number;
};

const MAX_HISTORY = 5; // Maksimum riwayat yang disimpan

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useSearch();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const router = useRouter();

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Mock data pencarian - dalam implementasi nyata, ini akan diganti dengan API call
  const mockSearch = (query: string): SearchResult[] => {
    if (!query) return [];
    
    const allContent = [
      {
        id: '1',
        title: 'Kalkulator',
        description: 'Alat hitung dengan berbagai fungsi',
        url: '/tools/calculator',
        type: 'tool' as const,
      },
      {
        id: '2',
        title: 'Konversi Mata Uang',
        description: 'Konversi berbagai mata uang dunia',
        url: '/tools/currency',
        type: 'tool' as const,
      },
      // Tambahkan lebih banyak konten sesuai kebutuhan
    ];

    return allContent.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Save search to history
  const saveToHistory = (query: string) => {
    if (!query.trim()) return;

    const newHistory = [
      { query: query.trim(), timestamp: Date.now() },
      ...searchHistory.filter(item => item.query !== query.trim())
    ].slice(0, MAX_HISTORY);

    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Clear single history item
  const clearHistoryItem = (query: string) => {
    const newHistory = searchHistory.filter(item => item.query !== query);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Use history item
  const useHistoryItem = (query: string) => {
    setSearchQuery(query);
  };

  // Pindahkan useHistoryItem ke luar callback
  const historyItem = useHistoryItem;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Gunakan historyItem di sini
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsSearchOpen(true);
    }
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (searchQuery) {
      const searchResults = mockSearch(searchQuery);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleSelect = (result: SearchResult) => {
    saveToHistory(searchQuery);
    router.push(result.url);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50">
      <div className="fixed inset-x-0 top-20 max-w-2xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          {/* Search Input */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari apa saja... (Ctrl + K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto p-2">
            {/* Search History */}
            {!searchQuery && searchHistory.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Riwayat Pencarian
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Hapus Semua
                  </button>
                </div>
                <div className="space-y-1">
                  {searchHistory.map((item) => (
                    <div
                      key={item.timestamp}
                      className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group"
                    >
                      <button
                        onClick={() => historyItem(item.query)}
                        className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
                      >
                        <ClockIcon className="h-4 w-4" />
                        <span>{item.query}</span>
                      </button>
                      <button
                        onClick={() => clearHistoryItem(item.query)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className="w-full p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {result.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Tidak ada hasil yang ditemukan
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
} 