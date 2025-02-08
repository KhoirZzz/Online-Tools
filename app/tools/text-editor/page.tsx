"use client";

import { useState, useEffect } from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import { 
  DocumentTextIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  DocumentArrowUpIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

export default function TextEditorPage() {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('untitled.txt');
  const [showMenu, setShowMenu] = useState(false);
  const [stats, setStats] = useState({
    characters: 0,
    words: 0,
    lines: 0
  });

  useEffect(() => {
    updateStats(text);
  }, [text]);

  const updateStats = (content: string) => {
    setStats({
      characters: content.length,
      words: content.trim() === '' ? 0 : content.trim().split(/\s+/).length,
      lines: content.split('\n').length
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Teks berhasil disalin!');
    } catch {
      alert('Gagal menyalin teks');
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua teks?')) {
      setText('');
      setFileName('untitled.txt');
    }
  };

  // Tambahkan useEffect untuk menutup menu saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('editor-menu');
      const button = document.getElementById('menu-button');
      if (menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            {/* Editor Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <DocumentTextIcon className="h-6 w-6 text-gray-500" />
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="text-lg font-semibold bg-transparent text-gray-900 
                      dark:text-white focus:outline-none focus:ring-2 
                      focus:ring-blue-500 rounded px-2 py-1"
                  />
                </div>

                {/* Menu Dropdown */}
                <div className="relative">
                  <button
                    id="menu-button"
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300
                      hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>

                  {showMenu && (
                    <div
                      id="editor-menu"
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 
                        rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleCopy();
                            setShowMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 
                            dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <DocumentDuplicateIcon className="h-5 w-5 mr-3" />
                          Salin Teks
                        </button>

                        <button
                          onClick={() => {
                            handleDownload();
                            setShowMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 
                            dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <ArrowDownTrayIcon className="h-5 w-5 mr-3" />
                          Unduh File
                        </button>

                        <label
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 
                            dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          <DocumentArrowUpIcon className="h-5 w-5 mr-3" />
                          Unggah File
                          <input
                            type="file"
                            accept=".txt"
                            onChange={(e) => {
                              handleUpload(e);
                              setShowMenu(false);
                            }}
                            className="hidden"
                          />
                        </label>

                        <button
                          onClick={() => {
                            handleClear();
                            setShowMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 
                            dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <TrashIcon className="h-5 w-5 mr-3" />
                          Hapus Semua
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Editor Content */}
            <div className="p-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-[60vh] p-4 bg-gray-50 dark:bg-gray-700 
                  text-gray-900 dark:text-white rounded-lg border-0
                  focus:ring-2 focus:ring-blue-500 resize-none
                  font-mono text-sm"
                placeholder="Mulai mengetik..."
              />
            </div>

            {/* Editor Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="space-x-4">
                  <span>{stats.characters} karakter</span>
                  <span>{stats.words} kata</span>
                  <span>{stats.lines} baris</span>
                </div>
                <div>
                  {text.length > 0 && (
                    <span>
                      Terakhir diubah: {new Date().toLocaleTimeString('id-ID')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 