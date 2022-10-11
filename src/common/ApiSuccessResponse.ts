import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class ApiSuccessResponse<T> {
  @Exclude() private _statusCode: number;
  @Exclude() private _message: string;
  @Exclude() private _data: T;

  private constructor(code: number, msg: string, data: T) {
    this._statusCode = code;
    this._message = msg;
    this._data = data;
  }
  @ApiProperty({
    description: 'api 결과 코드',
    type: Number,
    minimum: 200,
    maximum: 299,
  })
  @Expose()
  get statusCode() {
    return this._statusCode;
  }

  @ApiProperty({ description: 'api 결과 메시지' })
  @Expose()
  get message() {
    return this._message;
  }

  @ApiProperty({ description: 'api 결과 데이터' })
  @Expose()
  get data() {
    return this._data;
  }

  static successResult<T>(data: T): ApiSuccessResponse<T> {
    const result = new ApiSuccessResponse<T>(200, 'success', data);
    return result;
  }

  static createResult<T>(data: T): ApiSuccessResponse<T> {
    const result = new ApiSuccessResponse<T>(201, 'created', data);
    return result;
  }
}
