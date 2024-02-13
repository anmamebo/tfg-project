import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // Puedes sobrescribir cualquiera de los métodos definidos en la clase padre

  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    // Si locale es undefined, usa 'es-ES' como valor predeterminado
    const usedLocale = locale || 'es-ES';
    return formatDate(date, 'HH:mm', usedLocale);
  }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    // Si locale es undefined, usa 'es-ES' como valor predeterminado
    const usedLocale = locale || 'es-ES';
    return this.dayViewHour({ date, locale: usedLocale });
  }
}
