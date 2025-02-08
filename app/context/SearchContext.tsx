"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type SearchContextType = {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ 
      isSearchOpen, 
      setIsSearchOpen, 
      searchQuery, 
      setSearchQuery 
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 