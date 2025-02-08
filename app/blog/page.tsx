"use client";

import Link from 'next/link';
import Breadcrumb from "../components/Breadcrumb";
import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Memulai Perjalanan Programming",
    slug: "memulai-perjalanan-programming",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    author: "John Doe",
    date: "2024-01-15",
    category: "Programming",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Tips Produktivitas untuk Developer",
    slug: "tips-produktivitas-developer",
    excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
    author: "Jane Smith",
    date: "2024-01-20",
    category: "Productivity",
    readTime: "3 min read"
  },
  {
    id: 3,
    title: "Belajar React dari Dasar",
    slug: "belajar-react-dasar",
    excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...",
    author: "Bob Wilson",
    date: "2024-01-25",
    category: "React",
    readTime: "7 min read"
  },
  // Tambahkan post lainnya sesuai kebutuhan
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-montserrat">
                Blog
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Artikel terbaru seputar teknologi dan programming
              </p>
            </div>

            {/* Blog Posts */}
            <div className="space-y-6">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden 
                    hover:ring-2 hover:ring-blue-500 transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="inline-flex items-center">
                        <UserIcon className="w-4 h-4 mr-1" />
                        {post.author}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 
                        dark:bg-gray-700"
                      >
                        {post.category}
                      </span>
                    </div>

                    <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-blue-600 dark:text-blue-400">
                        Baca selengkapnya
                      </span>
                      <span className="ml-2 text-gray-400">• {post.readTime}</span>
                    </div>
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