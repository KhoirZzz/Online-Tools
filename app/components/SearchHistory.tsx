import { ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// Tipe data untuk riwayat pencarian
type SearchHistoryItem = {
  id: string;
  query: string;
  timestamp: string;
};

// Data dummy untuk contoh
const dummyHistory: SearchHistoryItem[] = [
  { id: "1", query: "Tutorial Next.js", timestamp: "2 jam yang lalu" },
  { id: "2", query: "Cara menggunakan Tailwind CSS", timestamp: "5 jam yang lalu" },
  { id: "3", query: "React hooks tutorial", timestamp: "1 hari yang lalu" },
];

export default function SearchHistory() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-montserrat">
        Riwayat Pencarian
      </h2>
      <div className="space-y-3">
        {dummyHistory.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {item.query}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.timestamp}
                </p>
              </div>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
} 