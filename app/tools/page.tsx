import Breadcrumb from "../components/Breadcrumb";
import { 
  CalculatorIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  CalendarIcon,
  ScaleIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

const tools = [
  {
    id: 1,
    name: "Kalkulator",
    description: "Hitung dengan mudah dan cepat",
    icon: CalculatorIcon,
    href: "/tools/calculator",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Konversi Waktu",
    description: "Konversi zona waktu dengan akurat",
    icon: ClockIcon,
    href: "/tools/time",
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "Kurs Mata Uang",
    description: "Konversi mata uang real-time",
    icon: CurrencyDollarIcon,
    href: "/tools/currency",
    color: "bg-purple-500"
  },
  {
    id: 4,
    name: "Kalender",
    description: "Lihat tanggal dan jadwal",
    icon: CalendarIcon,
    href: "/tools/calendar",
    color: "bg-red-500"
  },
  {
    id: 5,
    name: "Konversi Satuan",
    description: "Konversi berbagai jenis satuan",
    icon: ScaleIcon,
    href: "/tools/units",
    color: "bg-yellow-500"
  },
  {
    id: 6,
    name: "Teks Editor",
    description: "Edit dan format teks dengan mudah",
    icon: DocumentTextIcon,
    href: "/tools/text-editor",
    color: "bg-pink-500"
  }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <div className="pt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 font-montserrat">
              Alat & Utilitas
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Link 
                  key={tool.id}
                  href={tool.href}
                  className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${tool.color} p-3 rounded-xl`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tool.description}
                      </p>
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