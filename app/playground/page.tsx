"use client";

import Link from 'next/link';
import Breadcrumb from "../components/Breadcrumb";
import { 
  TvIcon,
  VideoCameraIcon,
  RadioIcon,
} from "@heroicons/react/24/outline";

const STREAMING_OPTIONS = [
  {
    id: 'tv',
    name: 'Streaming TV',
    icon: TvIcon,
    description: 'Tonton siaran TV langsung dari berbagai channel lokal dan internasional.',
    href: '/playground/tv'
  },
  {
    id: 'youtube',
    name: 'Streaming Youtube',
    icon: VideoCameraIcon,
    description: 'Streaming video dari platform YouTube dengan tampilan yang optimal.',
    href: '/playground/youtube'
  },
  {
    id: 'radio',
    name: 'Radio Online',
    icon: RadioIcon,
    description: 'Dengarkan siaran radio dari berbagai stasiun radio di Indonesia.',
    href: '/playground/radio'
  },
];

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-montserrat">
                Playground
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Pilih layanan streaming yang ingin Anda nikmati
              </p>
            </div>

            {/* Menu List */}
            <div className="space-y-2">
              {STREAMING_OPTIONS.map((option) => (
                <Link
                  key={option.id}
                  href={option.href}
                  className="group flex items-center p-4 rounded-lg
                    hover:bg-gray-100 dark:hover:bg-gray-800 
                    transition-colors duration-200"
                >
                  <div className="flex-shrink-0 p-2">
                    <option.icon className="w-6 h-6 text-gray-500 dark:text-gray-400 
                      group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white 
                      group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    >
                      {option.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 
                        dark:group-hover:text-blue-400 transform group-hover:translate-x-1 
                        transition-transform" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 