"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from "../../components/Breadcrumb";
import { CalendarIcon, UserIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// Dummy data untuk detail blog
const BLOG_DETAIL = {
  title: "Memulai Perjalanan Programming",
  author: "John Doe",
  date: "2024-01-15",
  category: "Programming",
  readTime: "5 min read",
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
    <h2>Bagian 1: Pengenalan</h2>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    
    <h2>Bagian 2: Pembahasan</h2>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    
    <ul>
      <li>Point pertama dalam pembahasan</li>
      <li>Point kedua yang penting</li>
      <li>Point ketiga untuk diingat</li>
    </ul>
    
    <h2>Bagian 3: Kesimpulan</h2>
    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    
    <blockquote>
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
    </blockquote>
  `
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            {/* Back Button */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm text-gray-500 
                  hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Kembali ke Blog
              </Link>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  {new Date(BLOG_DETAIL.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="inline-flex items-center">
                  <UserIcon className="w-4 h-4 mr-1" />
                  {BLOG_DETAIL.author}
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 
                  dark:bg-gray-700"
                >
                  {BLOG_DETAIL.category}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                {BLOG_DETAIL.title}
              </h1>

              <div 
                className="mt-6 prose prose-blue max-w-none dark:prose-invert
                  prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-p:text-gray-600 dark:prose-p:text-gray-300
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                  prose-blockquote:pl-4 prose-blockquote:italic"
                dangerouslySetInnerHTML={{ __html: BLOG_DETAIL.content }}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 