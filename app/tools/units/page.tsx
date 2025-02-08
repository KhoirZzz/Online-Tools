"use client";

import { useState } from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import { 
  ArrowsRightLeftIcon,
  BeakerIcon,
  ScaleIcon,
  ArrowsUpDownIcon,
  ClockIcon,
  CircleStackIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

type UnitCategory = {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  units: { value: string; label: string; }[];
  convert: (value: number, from: string, to: string) => number;
};

const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    name: 'Panjang',
    icon: ArrowsUpDownIcon,
    units: [
      { value: 'km', label: 'Kilometer' },
      { value: 'm', label: 'Meter' },
      { value: 'cm', label: 'Centimeter' },
      { value: 'mm', label: 'Millimeter' },
      { value: 'mi', label: 'Mile' },
      { value: 'yd', label: 'Yard' },
      { value: 'ft', label: 'Feet' },
      { value: 'in', label: 'Inch' },
    ],
    convert: (value, from, to) => {
      const meterConversion: { [key: string]: number } = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.344,
        yd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
      };
      const meters = value * meterConversion[from];
      return meters / meterConversion[to];
    }
  },
  {
    id: 'weight',
    name: 'Berat',
    icon: ScaleIcon,
    units: [
      { value: 'kg', label: 'Kilogram' },
      { value: 'g', label: 'Gram' },
      { value: 'mg', label: 'Milligram' },
      { value: 'lb', label: 'Pound' },
      { value: 'oz', label: 'Ounce' },
    ],
    convert: (value, from, to) => {
      const gramConversion: { [key: string]: number } = {
        kg: 1000,
        g: 1,
        mg: 0.001,
        lb: 453.59237,
        oz: 28.349523125,
      };
      const grams = value * gramConversion[from];
      return grams / gramConversion[to];
    }
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: BeakerIcon,
    units: [
      { value: 'l', label: 'Liter' },
      { value: 'ml', label: 'Milliliter' },
      { value: 'gal', label: 'Gallon' },
      { value: 'qt', label: 'Quart' },
      { value: 'pt', label: 'Pint' },
      { value: 'cup', label: 'Cup' },
      { value: 'floz', label: 'Fluid Ounce' },
    ],
    convert: (value, from, to) => {
      const literConversion: { [key: string]: number } = {
        l: 1,
        ml: 0.001,
        gal: 3.78541,
        qt: 0.946353,
        pt: 0.473176,
        cup: 0.236588,
        floz: 0.0295735,
      };
      const liters = value * literConversion[from];
      return liters / literConversion[to];
    }
  },
  {
    id: 'time',
    name: 'Waktu',
    icon: ClockIcon,
    units: [
      { value: 'hr', label: 'Jam' },
      { value: 'min', label: 'Menit' },
      { value: 'sec', label: 'Detik' },
      { value: 'ms', label: 'Milidetik' },
    ],
    convert: (value, from, to) => {
      const msConversion: { [key: string]: number } = {
        hr: 3600000,
        min: 60000,
        sec: 1000,
        ms: 1,
      };
      const ms = value * msConversion[from];
      return ms / msConversion[to];
    }
  },
  {
    id: 'digital',
    name: 'Digital',
    icon: ComputerDesktopIcon,
    units: [
      { value: 'TB', label: 'Terabyte' },
      { value: 'GB', label: 'Gigabyte' },
      { value: 'MB', label: 'Megabyte' },
      { value: 'KB', label: 'Kilobyte' },
      { value: 'B', label: 'Byte' },
    ],
    convert: (value, from, to) => {
      const byteConversion: { [key: string]: number } = {
        TB: 1099511627776,
        GB: 1073741824,
        MB: 1048576,
        KB: 1024,
        B: 1,
      };
      const bytes = value * byteConversion[from];
      return bytes / byteConversion[to];
    }
  },
  {
    id: 'temperature',
    name: 'Suhu',
    icon: CircleStackIcon,
    units: [
      { value: 'C', label: 'Celsius' },
      { value: 'F', label: 'Fahrenheit' },
      { value: 'K', label: 'Kelvin' },
    ],
    convert: (value, from, to) => {
      // Konversi ke Celsius terlebih dahulu
      let celsius;
      switch (from) {
        case 'F':
          celsius = (value - 32) * 5/9;
          break;
        case 'K':
          celsius = value - 273.15;
          break;
        default:
          celsius = value;
      }

      // Konversi dari Celsius ke unit target
      switch (to) {
        case 'F':
          return (celsius * 9/5) + 32;
        case 'K':
          return celsius + 273.15;
        default:
          return celsius;
      }
    }
  },
];

export default function UnitsPage() {
  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>(UNIT_CATEGORIES[0]);
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('km');
  const [toUnit, setToUnit] = useState<string>('m');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount)) {
      const convertedValue = selectedCategory.convert(numAmount, fromUnit, toUnit);
      setResult(convertedValue);
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    handleConvert();
  };

  const handleConversion = (value: number, from: string, to: string) => {
    let convertedValue = value;
    
    // Contoh logika konversi sederhana
    if (from === 'km' && to === 'm') {
      convertedValue = value * 1000;
    } else if (from === 'm' && to === 'km') {
      convertedValue = value / 1000;
    }
    
    setResult(convertedValue);
    return convertedValue;
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    const absNum = Math.abs(num);
    if (absNum < 0.000001 || absNum > 999999999) {
      return num.toExponential(6);
    }
    return num.toLocaleString('id-ID', {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Konversi Unit
            </h1>

            {/* Category Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {UNIT_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setFromUnit(category.units[0].value);
                    setToUnit(category.units[1].value);
                    setResult(null);
                  }}
                  className={`
                    flex items-center space-x-2 p-3 rounded-lg
                    ${selectedCategory.id === category.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
                  `}
                >
                  <category.icon className="h-5 w-5" />
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Converter */}
            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Jumlah
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (e.target.value) handleConvert();
                  }}
                  className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan jumlah"
                  min="0"
                  step="any"
                />
              </div>

              {/* Unit Selectors */}
              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <select
                  value={fromUnit}
                  onChange={(e) => {
                    setFromUnit(e.target.value);
                    handleConvert();
                  }}
                  className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {selectedCategory.units.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleSwap}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Tukar unit"
                >
                  <ArrowsRightLeftIcon className="h-6 w-6 text-gray-500" />
                </button>

                <select
                  value={toUnit}
                  onChange={(e) => {
                    setToUnit(e.target.value);
                    handleConvert();
                  }}
                  className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {selectedCategory.units.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Result */}
              {result !== null && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Hasil Konversi
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {formatNumber(result)} {toUnit}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 