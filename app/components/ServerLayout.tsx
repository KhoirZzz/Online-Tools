import { ReactNode } from 'react';

export default function ServerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto transition-all duration-300">
        {children}
      </div>
    </div>
  );
} 