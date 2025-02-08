"use client";

import { useState, useEffect } from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import { 
  ClockIcon, 
  PlayIcon, 
  PauseIcon, 
  ArrowPathIcon 
} from "@heroicons/react/24/outline";
import { formatDate } from '../../utils/dateFormatter';

type TimeZone = {
  name: string;
  offset: string;
  flag: string;
};

const timeZones: TimeZone[] = [
  { name: 'WIB (Jakarta)', offset: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'WITA (Makassar)', offset: 'Asia/Makassar', flag: '🇮🇩' },
  { name: 'WIT (Jayapura)', offset: 'Asia/Jayapura', flag: '🇮🇩' },
  { name: 'London', offset: 'Europe/London', flag: '🇬🇧' },
  { name: 'New York', offset: 'America/New_York', flag: '🇺🇸' },
  { name: 'Tokyo', offset: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Dubai', offset: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'Singapore', offset: 'Asia/Singapore', flag: '🇸🇬' },
];

export default function TimePage() {
  const [mounted, setMounted] = useState(false);
  const [selectedZones, setSelectedZones] = useState<string[]>(['Asia/Jakarta']);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Stopwatch state
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Stopwatch logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time => time + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const toggleZone = (zone: string) => {
    if (selectedZones.includes(zone)) {
      setSelectedZones(selectedZones.filter(z => z !== zone));
    } else {
      setSelectedZones([...selectedZones, zone]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStopwatchReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Breadcrumb />
            <div className="pt-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Konversi Waktu
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <div className="pt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Konversi Waktu
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Time Zones Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <ClockIcon className="w-6 h-6 mr-2" />
                  Zona Waktu
                </h2>

                <div className="space-y-4">
                  {timeZones.map((zone) => (
                    <div 
                      key={zone.offset}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{zone.flag}</span>
                        <span className="text-gray-900 dark:text-white">{zone.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600 dark:text-gray-400">
                          {formatDate(currentTime.toLocaleTimeString('id-ID', { timeZone: zone.offset }))}
                        </span>
                        <button
                          onClick={() => toggleZone(zone.offset)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                            ${selectedZones.includes(zone.offset)
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                        >
                          {selectedZones.includes(zone.offset) ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stopwatch Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Stopwatch
                </h2>

                <div className="text-center">
                  <div className="text-4xl font-mono text-gray-900 dark:text-white mb-6">
                    {formatTime(time)}
                  </div>

                  <div className="flex justify-center space-x-4 mb-6">
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors
                        ${isRunning
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        }`}
                    >
                      {isRunning ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                    </button>
                    <button
                      onClick={handleLap}
                      className="px-6 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 
                        text-blue-600 dark:text-blue-400 font-medium transition-colors"
                      disabled={!isRunning}
                    >
                      Lap
                    </button>
                    <button
                      onClick={handleStopwatchReset}
                      className="px-6 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                        text-gray-600 dark:text-gray-400 font-medium transition-colors"
                    >
                      <ArrowPathIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Laps */}
                  {laps.length > 0 && (
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="py-2 text-left text-gray-600 dark:text-gray-400">Lap</th>
                            <th className="py-2 text-right text-gray-600 dark:text-gray-400">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {laps.map((lapTime, index) => (
                            <tr key={index} className="border-t dark:border-gray-700">
                              <td className="py-2 text-left text-gray-900 dark:text-white">
                                #{laps.length - index}
                              </td>
                              <td className="py-2 text-right font-mono text-gray-900 dark:text-white">
                                {formatTime(lapTime)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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