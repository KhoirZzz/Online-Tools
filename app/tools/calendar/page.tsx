"use client";

import { useState, useEffect } from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

type Event = {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  color: string;
};

const DAYS_OF_WEEK = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const EVENT_COLORS = [
  { id: 'blue', value: '#3B82F6', label: 'Biru' },
  { id: 'red', value: '#EF4444', label: 'Merah' },
  { id: 'green', value: '#10B981', label: 'Hijau' },
  { id: 'yellow', value: '#F59E0B', label: 'Kuning' },
  { id: 'purple', value: '#8B5CF6', label: 'Ungu' },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [_selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>(() => {
    if (typeof window !== 'undefined') {
      const savedEvents = localStorage.getItem('calendar-events');
      return savedEvents ? JSON.parse(savedEvents) : [];
    }
    return [];
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    color: EVENT_COLORS[0].value
  });

  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty days for padding
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventModal(true);
    setNewEvent({
      date: date.toISOString().split('T')[0],
      color: EVENT_COLORS[0].value
    });
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        time: newEvent.time,
        color: newEvent.color || EVENT_COLORS[0].value
      };
      
      setEvents([...events, event]);
      setShowEventModal(false);
      setNewEvent({ color: EVENT_COLORS[0].value });
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => event.date === date.toISOString().split('T')[0]);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Breadcrumb />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Calendar Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              <div className="grid grid-cols-7 gap-4">
                {/* Day Headers */}
                {DAYS_OF_WEEK.map(day => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    {day.slice(0, 3)}
                  </div>
                ))}

                {/* Calendar Days */}
                {days.map((date, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square relative
                      ${date ? 'cursor-pointer' : 'pointer-events-none'}
                    `}
                    onClick={() => date && handleDateClick(date)}
                  >
                    {date && (
                      <div className={`
                        absolute inset-0 rounded-full p-1
                        flex flex-col items-center justify-start
                        ${date.toDateString() === new Date().toDateString()
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}
                        transition-colors duration-200
                      `}>
                        <span className={`
                          w-8 h-8 flex items-center justify-center rounded-full
                          text-sm font-medium
                          ${date.toDateString() === new Date().toDateString()
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 dark:text-gray-200'}
                        `}>
                          {date.getDate()}
                        </span>
                        
                        {/* Events */}
                        <div className="w-full mt-1 space-y-1 px-1">
                          {getEventsForDate(date).slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className="group relative text-xs py-0.5 px-1.5 rounded-full"
                              style={{ backgroundColor: `${event.color}20` }}
                            >
                              <span 
                                className="block truncate" 
                                style={{ color: event.color }}
                              >
                                {event.title}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteEvent(event.id);
                                }}
                                className="absolute -right-1 -top-1 hidden group-hover:flex
                                  h-4 w-4 items-center justify-center rounded-full
                                  bg-red-500 text-white text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          {getEventsForDate(date).length > 2 && (
                            <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                              +{getEventsForDate(date).length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Tambah Event
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Judul
                </label>
                <input
                  type="text"
                  value={newEvent.title || ''}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={newEvent.description || ''}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Waktu
                </label>
                <input
                  type="time"
                  value={newEvent.time || ''}
                  onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Warna
                </label>
                <div className="flex space-x-2">
                  {EVENT_COLORS.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setNewEvent({ ...newEvent, color: color.value })}
                      className={`w-8 h-8 rounded-full ${
                        newEvent.color === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600
                    hover:bg-blue-700 rounded-lg"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 