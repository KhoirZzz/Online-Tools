"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  WrenchScrewdriverIcon,
  NewspaperIcon,
  BeakerIcon
} from "@heroicons/react/24/outline";
import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {
  const pathname = usePathname() || '';
  const { isOpen, setIsOpen } = useSidebar();
  
  return (
    <>
      <aside 
        className={`fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-900 border-r dark:border-gray-800 pt-16 
          transition-all duration-300 ease-in-out z-20
          ${isOpen ? 'w-16 translate-x-0' : 'w-16 -translate-x-16'}`}
      >
        <div className="flex flex-col items-center h-full pb-4">
          <div className="flex flex-col items-center space-y-4">
            <Link 
              href="/" 
              className={`p-2 rounded-xl transition-colors group relative ${
                pathname === "/" 
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <HomeIcon className="w-6 h-6" />
              <span className="absolute left-14 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-md 
                shadow-lg translate-x-2 opacity-0 invisible
                group-hover:opacity-100 group-hover:visible group-hover:translate-x-0
                transition-all duration-200 ease-in-out whitespace-nowrap z-50">
                Beranda
              </span>
            </Link>

            <Link 
              href="/blog" 
              className={`p-2 rounded-xl transition-colors group relative ${
                pathname.startsWith("/blog") 
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <NewspaperIcon className="w-6 h-6" />
              <span className="absolute left-14 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-md 
                shadow-lg translate-x-2 opacity-0 invisible
                group-hover:opacity-100 group-hover:visible group-hover:translate-x-0
                transition-all duration-200 ease-in-out whitespace-nowrap z-50">
                Blog
              </span>
            </Link>

            <Link 
              href="/playground" 
              className={`p-2 rounded-xl transition-colors group relative ${
                pathname.startsWith("/playground") 
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <BeakerIcon className="w-6 h-6" />
              <span className="absolute left-14 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-md 
                shadow-lg translate-x-2 opacity-0 invisible
                group-hover:opacity-100 group-hover:visible group-hover:translate-x-0
                transition-all duration-200 ease-in-out whitespace-nowrap z-50">
                Playground
              </span>
            </Link>

            <Link 
              href="/tools" 
              className={`p-2 rounded-xl transition-colors group relative ${
                pathname.startsWith("/tools") 
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <WrenchScrewdriverIcon className="w-6 h-6" />
              <span className="absolute left-14 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-md 
                shadow-lg translate-x-2 opacity-0 invisible
                group-hover:opacity-100 group-hover:visible group-hover:translate-x-0
                transition-all duration-200 ease-in-out whitespace-nowrap z-50">
                Tools
              </span>
            </Link>

            <Link 
              href="/about" 
              className={`p-2 rounded-xl transition-colors group relative ${
                pathname === "/about" 
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <InformationCircleIcon className="w-6 h-6" />
              <span className="absolute left-14 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-md 
                shadow-lg translate-x-2 opacity-0 invisible
                group-hover:opacity-100 group-hover:visible group-hover:translate-x-0
                transition-all duration-200 ease-in-out whitespace-nowrap z-50">
                Tentang
              </span>
            </Link>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-20 z-30 transition-all duration-300 ease-in-out
          bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
          p-1.5 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800
          ${isOpen ? 'left-14' : 'left-2'}`}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? (
          <ChevronLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </>
  );
} 