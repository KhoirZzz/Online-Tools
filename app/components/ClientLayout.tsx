"use client";

import { SidebarProvider } from '../context/SidebarContext';
import { SearchProvider } from '../context/SearchContext';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import SearchModal from './SearchModal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <Sidebar />
        <SearchModal />
        <MainContent>{children}</MainContent>
      </SidebarProvider>
    </SearchProvider>
  );
} 