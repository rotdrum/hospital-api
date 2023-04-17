import { HttpStatus } from '@nestjs/common';
import { IPaginationLinks, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { ErrorResponseInterface } from 'src/exceptions/exception.filter';

export class ApiResource {
  /**
   * Success response
   * @param [data]
   * @returns SuccessResponseInterface
   */
  static successResponse(data?: any): SuccessResponseInterface {
    if (data === undefined) {
      return { status: { code: HttpStatus.OK, message: 'OK' } };
    }

    if (data.items) {
      const { items, links, meta } = data;

      return {
        data: items,
        links,
        meta,
        status: { code: HttpStatus.OK, message: 'OK' },
      };
    }

    return { data, status: { code: HttpStatus.OK, message: 'OK' } };
  }

  /**
   * Errors response
   * @param error
   */
  static errorResponse(error: Error): ErrorResponseInterface {
    // All exception will be handle by exception filters
    throw error;
  }
}

export interface SuccessResponseInterface {
  status: { code: number; message: string };
  data?: Record<string, unknown>;
  links?: IPaginationMeta;
  meta?: IPaginationLinks;
}
