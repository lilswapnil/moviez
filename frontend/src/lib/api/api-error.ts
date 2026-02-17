// API error handling
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'APIError';
  }

  isNotFound(): boolean {
    return this.statusCode === 404;
  }

  isServerError(): boolean {
    return this.statusCode >= 500;
  }

  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }
}
