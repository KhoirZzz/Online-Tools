"use client";

import { useState } from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import { 
  BackspaceIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

type CalculatorMode = 'standard' | 'scientific';

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [mode, setMode] = useState<CalculatorMode>('standard');
  const [memory, setMemory] = useState<number>(0);

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleEquals = () => {
    try {
      const result = eval(equation + display);
      setDisplay(Number(result.toFixed(8)).toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleScientific = (func: string) => {
    try {
      let result: number;
      const currentNumber = parseFloat(display);

      switch (func) {
        case 'sin':
          result = Math.sin(currentNumber);
          break;
        case 'cos':
          result = Math.cos(currentNumber);
          break;
        case 'tan':
          result = Math.tan(currentNumber);
          break;
        case 'sqrt':
          result = Math.sqrt(currentNumber);
          break;
        case 'square':
          result = Math.pow(currentNumber, 2);
          break;
        case 'cube':
          result = Math.pow(currentNumber, 3);
          break;
        case 'log':
          result = Math.log10(currentNumber);
          break;
        case 'ln':
          result = Math.log(currentNumber);
          break;
        default:
          return;
      }

      setDisplay(Number(result.toFixed(8)).toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <div className="pt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Kalkulator
            </h1>

            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              {/* Mode Switcher */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setMode('standard')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${mode === 'standard' 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setMode('scientific')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${mode === 'scientific' 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  Scientific
                </button>
              </div>

              {/* Display */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <div className="text-right text-gray-500 dark:text-gray-400 text-sm h-6">
                  {equation}
                </div>
                <div className="text-right text-3xl font-semibold text-gray-900 dark:text-white overflow-x-auto">
                  {display}
                </div>
              </div>

              {/* Scientific Buttons */}
              {mode === 'scientific' && (
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['sin', 'cos', 'tan', 'sqrt', 'square', 'cube', 'log', 'ln'].map((func) => (
                    <button
                      key={func}
                      onClick={() => handleScientific(func)}
                      className="p-2 text-sm rounded-lg bg-purple-100 dark:bg-purple-900/20 
                        text-purple-600 dark:text-purple-400 hover:bg-purple-200 
                        dark:hover:bg-purple-900/40 transition-colors"
                    >
                      {func === 'square' ? 'x²' : 
                       func === 'cube' ? 'x³' : 
                       func === 'sqrt' ? '√' : func}
                    </button>
                  ))}
                </div>
              )}

              {/* Number Pad */}
              <div className="grid grid-cols-4 gap-2">
                {/* First Row */}
                <button
                  onClick={handleClear}
                  className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 
                    text-red-600 dark:text-red-400 hover:bg-red-200 
                    dark:hover:bg-red-900/40 transition-colors"
                >
                  C
                </button>
                <button
                  onClick={handleBackspace}
                  className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 
                    text-gray-600 dark:text-gray-400 hover:bg-gray-200 
                    dark:hover:bg-gray-600 transition-colors"
                >
                  <BackspaceIcon className="w-6 h-6 mx-auto" />
                </button>
                <button
                  onClick={() => handleOperator('%')}
                  className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 
                    text-gray-600 dark:text-gray-400 hover:bg-gray-200 
                    dark:hover:bg-gray-600 transition-colors"
                >
                  %
                </button>
                <button
                  onClick={() => handleOperator('/')}
                  className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 
                    text-gray-600 dark:text-gray-400 hover:bg-gray-200 
                    dark:hover:bg-gray-600 transition-colors"
                >
                  ÷
                </button>

                {/* Numbers and Operators */}
                {['7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      switch (btn) {
                        case '=': handleEquals(); break;
                        case '×': handleOperator('*'); break;
                        case '.': handleDecimal(); break;
                        case '+':
                        case '-': handleOperator(btn); break;
                        default: handleNumber(btn);
                      }
                    }}
                    className={`p-4 rounded-lg transition-colors ${
                      btn === '=' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white col-span-2'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    } ${btn === '0' ? 'col-span-2' : ''}`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 