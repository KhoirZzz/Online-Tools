"use client";

import { useSidebar } from "../context/SidebarContext";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <main 
      className={`flex-1 min-h-screen transition-all duration-300 ease-in-out
        ${isOpen ? 'pl-16' : 'pl-0'}`}
    >
      <div className="p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </main>
  );
} 