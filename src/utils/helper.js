export const formatTimeWithAmPm = (time) => {
    if (!time) return 'Invalid time';
    const [hour, minute] = time.split(':').map(Number);
  
    
    if (isNaN(hour) || isNaN(minute)) return 'Invalid time';
  
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; 
    const formattedMinute = minute.toString().padStart(2, '0'); 
  
    return `${formattedHour}:${formattedMinute} ${amPm}`;
  };
  