import { addDays, format, parse } from 'date-fns';
export class DateUtil {
  /**
   * A data GMT-3
   * @returns Date
   */
  static getDate(): Date {
    try {
      const date = new Date();
      return new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
    } catch (err) {
      return null;
    }
  }
  /**
   * Convert string to date
   * @param dateStr Date yyyy-MM-dd
   */
  static toDate(dateStr: string): Date {
    try {
      return parse(dateStr, 'yyyy-MM-dd', new Date());
    } catch (err) {
      return null;
    }
  }

  /**
   * Data sem horario
   */
  static toDateZero(): Date {
    const now = new Date();
    now.setMilliseconds(0);
    now.setSeconds(0);
    now.setMinutes(0);
    now.setHours(0);
    return now;
  }
  /**
   * Remove o horario da data
   */
  static getDateZero(date: Date): Date {
    const d = new Date(date);
    d.setMilliseconds(0);
    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(0);
    return d;
  }

  static equals(d1: Date, d2: Date) {
    return d1.getTime() === d2.getTime();
  }

  static formatIso(date: number | Date) {
    return format(date, 'yyyy-MM-dd');
  }

  static addDaysDate(date: Date, days: number): Date {
    return addDays(date, days);
  }

  /**
   * A data GMT-3
   * @returns Date
   */
  static fromDate(date: Date): Date {
    try {
      return new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
    } catch (err) {
      return null;
    }
  }
}
