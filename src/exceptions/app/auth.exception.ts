import { ApiException } from './api.exception';

export class AuthException {
  static notFound(): ApiException {
    return new ApiException(300001, []);
  }

  static refreshTokenError(): ApiException {
    return new ApiException(300002, []);
  }

  static generateJwtError(): ApiException {
    return new ApiException(300003, []);
  }

  static userNotFound(): ApiException {
    return new ApiException(300004, []);
  }
}
