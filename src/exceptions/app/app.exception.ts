import { ApiException } from './api.exception';

export class AppException {
  static prototypeError(): ApiException {
    return new ApiException(900000, []);
  }
}
