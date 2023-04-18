import { ApiException } from './api.exception';

export class PatientException {
  static notFound(): ApiException {
    return new ApiException(400001, []);
  }

  static deleteError(error?: string[]): ApiException {
    return new ApiException(400002, error);
  }

  static createError(error?: string[]): ApiException {
    return new ApiException(400003, error);
  }

  static updateError(error?: string[]): ApiException {
    return new ApiException(400004, error);
  }
}
