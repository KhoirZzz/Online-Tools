import Breadcrumb from "../../components/Breadcrumb";
import CurrencyConverter from "../../components/CurrencyConverter";

export default function CurrencyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <div className="pt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Konversi Mata Uang
            </h1>

            <CurrencyConverter />
          </div>
        </div>
      </div>
    </div>
  );
} 