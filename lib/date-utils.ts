/**
 * Parse a date string in either DD/MM/YYYY HH:MM:SS or ISO format
 */
export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  try {
    // Try DD/MM/YYYY HH:MM:SS format (the real data format from the clinic system)
    const ddmmMatch = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:[\s T](\d{2}):(\d{2})(?::(\d{2}))?)?/);
    if (ddmmMatch) {
      const [, day, month, year, hour = '0', minute = '0', second = '0'] = ddmmMatch;
      return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
    }
    // Try ISO format YYYY-MM-DDTHH:MM:SS
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

export function getWeekDates(weekStr: string) {
  const [yearStr, weekStrPart] = weekStr.split("-W");
  const year = parseInt(yearStr, 10);
  const week = parseInt(weekStrPart, 10);
  
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7;
  const startOfWeek1 = new Date(jan4);
  startOfWeek1.setDate(jan4.getDate() - dayOfWeek + 1);
  
  const startOfTargetWeek = new Date(startOfWeek1);
  startOfTargetWeek.setDate(startOfWeek1.getDate() + (week - 1) * 7);
  
  const endOfTargetWeek = new Date(startOfTargetWeek);
  endOfTargetWeek.setDate(startOfTargetWeek.getDate() + 6);
  
  startOfTargetWeek.setHours(0, 0, 0, 0);
  endOfTargetWeek.setHours(23, 59, 59, 999);
  
  return { start: startOfTargetWeek, end: endOfTargetWeek };
}

export function isDateInPeriod(dateString: string, period: string): boolean {
  if (!dateString) return false;
  const date = parseDate(dateString);
  if (!date) return false;
  const now = new Date();

  // Reset times for today comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (period.startsWith("dia:")) {
    const rawDatePart = period.replace("dia:", "");
    const [year, month, day] = rawDatePart.split("-").map(Number);
    return targetDate.getFullYear() === year &&
           targetDate.getMonth() === (month - 1) &&
           targetDate.getDate() === day;
  }

  if (period.startsWith("mes:")) {
    const rawMonthPart = period.replace("mes:", "");
    const [year, month] = rawMonthPart.split("-").map(Number);
    return targetDate.getFullYear() === year &&
           targetDate.getMonth() === (month - 1);
  }

  if (period.startsWith("semana:")) {
    const rawWeekPart = period.replace("semana:", "");
    try {
      const { start, end } = getWeekDates(rawWeekPart);
      return targetDate >= start && targetDate <= end;
    } catch {
      return false;
    }
  }

  switch (period) {
    case "Hoje":
      return targetDate.getTime() === today.getTime();
      
    case "Esta semana": {
      // Assuming week starts on Sunday
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return targetDate >= startOfWeek && targetDate <= endOfWeek;
    }
      
    case "Este mês":
      return targetDate.getMonth() === today.getMonth() && targetDate.getFullYear() === today.getFullYear();
      
    case "Trimestre": {
      const currentQuarter = Math.floor(today.getMonth() / 3);
      const targetQuarter = Math.floor(targetDate.getMonth() / 3);
      return currentQuarter === targetQuarter && targetDate.getFullYear() === today.getFullYear();
    }
      
    case "Este ano":
      return targetDate.getFullYear() === today.getFullYear();
      
    default:
      return true; // If unknown period, show all
  }
}

export function filterByPeriod<T extends { data?: string }>(items: T[], period: string): T[] {
  if (!items || !Array.isArray(items)) return [];
  return items.filter(item => {
    if (!item.data) return false; // If there's no data field, exclude
    return isDateInPeriod(item.data, period);
  });
}

