export function formatDate(dateString: string): string {
  if (typeof window === 'undefined') {
    return dateString;
  }
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

export function formatTime(time: number): string {
  if (typeof window === 'undefined') {
    return '00:00.00';
  }

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
} 