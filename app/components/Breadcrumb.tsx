"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useSidebar } from "../context/SidebarContext"; 

export default function Breadcrumb() {
  const pathname = usePathname() || '';
  const paths = pathname.split("/").filter(path => path);
  const { isOpen } = useSidebar();
  
  return (
    <div className={`fixed top-0 right-0 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm z-10
      transition-all duration-300 ease-in-out
      ${isOpen ? 'left-16' : 'left-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex px-5 py-3">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <HomeIcon className="w-4 h-4 mr-2" />
                Beranda
              </Link>
            </li>
            
            {paths.map((path, index) => {
              const href = `/${paths.slice(0, index + 1).join("/")}`;
              const isLast = index === paths.length - 1;
              
              return (
                <li key={path} className="inline-flex items-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  {isLast ? (
                    <span className="ml-1 text-sm font-medium text-blue-600 dark:text-blue-400 capitalize">
                      {path}
                    </span>
                  ) : (
                    <Link 
                      href={href}
                      className="ml-1 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 capitalize"
                    >
                      {path}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
