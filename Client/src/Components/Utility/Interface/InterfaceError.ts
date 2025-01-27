export interface AppError {
  message: string;
  code?: number;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  details?: string;
}

export class CustomError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
