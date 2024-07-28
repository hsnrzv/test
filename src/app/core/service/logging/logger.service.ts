import {Injectable, isDevMode} from '@angular/core';

enum LogLevel {
  info = 'info',
  warn = 'warn',
  error = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {

  private readonly enableLogging = isDevMode();

  constructor() {}

  private static formatMessage(level: LogLevel, message: string) {
    return `[${level}] ${message}`;
  }

  public info(message: string, object?: any) {
    if (this.enableLogging) {
      const formatted = LoggerService.formatMessage(LogLevel.info, message);
      if (object) {
        console.log(formatted, object);
      } else {
        console.log(formatted);
      }
    }
  }

  public warn(message: string, object?: any) {
    const formatted = LoggerService.formatMessage(LogLevel.warn, message);
    console.warn(formatted, object);
  }

  public error(message: string, object?: any) {
    const formatted = LoggerService.formatMessage(LogLevel.error, message);
    console.error(formatted, object);
  }
}
