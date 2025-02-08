"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  CurrencyDollarIcon, 
  ArrowsRightLeftIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { formatDate } from '../utils/dateFormatter';
import { fetchCurrencyRate } from '../utils/api';
import type { Currency } from '../types/currency';

const popularCurrencies: Currency[] = [
  { code: 'IDR', name: 'Rupiah', country: 'Indonesia' },
  { code: 'USD', name: 'Dollar', country: 'Amerika Serikat' },
  { code: 'EUR', name: 'Euro', country: 'Zona Euro' },
  { code: 'JPY', name: 'Yen', country: 'Jepang' },
  { code: 'GBP', name: 'Pound', country: 'Inggris' },
  { code: 'SGD', name: 'Dollar', country: 'Singapura' },
  { code: 'AUD', name: 'Dollar', country: 'Australia' },
  { code: 'CNY', name: 'Yuan', country: 'Tiongkok' },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const formatNumber = useCallback((num: number): string => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(num);
  }, []);

  const handleConvert = useCallback(async () => {
    const numAmount = parseFloat(amount.toString());
    
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Masukkan jumlah yang valid');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchCurrencyRate(fromCurrency, toCurrency, numAmount);
      
      setResult(data.amount);
      setRate(data.rate);
      setDate(data.date);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setResult(null);
      setRate(null);
      setDate(null);
    } finally {
      setLoading(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  // Debounced conversion effect
  useEffect(() => {
    if (!amount || !fromCurrency || !toCurrency) return;

    const timeoutId = setTimeout(() => {
      handleConvert();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [handleConvert]); // handleConvert already includes all necessary dependencies

  // Input handlers
  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  }, []);

  const handleFromCurrencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  }, []);

  const handleToCurrencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  }, []);

  const handleConversion = useCallback(async () => {
    if (!amount || !fromCurrency || !toCurrency) return;
    
    try {
      const response = await fetch(`/api/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error converting currency:', error);
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    handleConversion();
  }, [handleConversion]);

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Jumlah
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan jumlah"
            min="0.01"
            step="0.01"
          />
        </div>
      </div>

      {/* Currency Selectors */}
      <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-6">
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {popularCurrencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name} {currency.country}
            </option>
          ))}
        </select>

        <button
          onClick={handleSwap}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Tukar mata uang"
        >
          <ArrowsRightLeftIcon className="h-6 w-6 text-gray-500" />
        </button>

        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {popularCurrencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name} {currency.country}
            </option>
          ))}
        </select>
      </div>

      {/* Result Display */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <ArrowPathIcon className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
          {error}
        </div>
      ) : result !== null && rate !== null ? (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Hasil Konversi
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {new Intl.NumberFormat('id-ID', { 
              style: 'currency', 
              currency: toCurrency 
            }).format(result)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            1 {fromCurrency} = {formatNumber(rate)} {toCurrency}
          </div>
          {date && (
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Terakhir diperbarui: {formatDate(date)}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
} 