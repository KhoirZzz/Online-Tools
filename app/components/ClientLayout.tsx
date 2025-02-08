"use client";

import { SidebarProvider } from '../context/SidebarContext';
import { SearchProvider } from '../context/SearchContext';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import SearchModal from './SearchModal';
import { useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <SearchProvider>
      <SidebarProvider>
        <Sidebar />
        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={handleCloseSearch}
        />
        <MainContent>{children}</MainContent>
      </SidebarProvider>
    </SearchProvider>
  );
} 