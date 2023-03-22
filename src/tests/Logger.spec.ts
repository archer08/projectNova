import { LoggerService } from "../services/config.service";

jest.mock("pino", () => {
  const info = jest.fn();
  const error = jest.fn();
  const pino = jest.fn(() => ({ info, error }));
  return pino;
});

describe("LoggerService", () => {
  let loggerService: LoggerService;
  let infoSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    loggerService = new LoggerService();
    infoSpy = jest.spyOn(loggerService["logger"], "info");
    errorSpy = jest.spyOn(loggerService["logger"], "error");
  });

  afterEach(() => {
    infoSpy.mockClear();
    errorSpy.mockClear();
  });

  it("should log message with options", () => {
    const message = "Test message";
    const options = { foo: "bar" };
    loggerService.log(message, options);
    expect(infoSpy).toHaveBeenCalledWith({ message, ...options });
  });

  it("should log error message with options", () => {
    const message = "Error message";
    const options = { error: new Error("Test error"), baz: "qux" };
    loggerService.error(message, options);
    expect(errorSpy).toHaveBeenCalledWith({ message, ...options });
  });
});
