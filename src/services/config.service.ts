import pino, { Logger } from "pino";

interface LogOptions {
  message?: string;
  [key: string]: any;
}

export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = pino({
      name: "ecommerce",
      level: "info",
    });
  }

  log(message: any, options: LogOptions = {}): void {
    this.logger.info({ message, ...options });
  }

  error(message: any, options: LogOptions = {}): void {
    this.logger.error({ message, ...options });
  }
}
