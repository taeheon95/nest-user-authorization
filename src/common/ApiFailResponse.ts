import { ApiProperty } from '@nestjs/swagger';
import { RequestMethod, HttpStatus } from '@nestjs/common';

export class ApiFailResponse {
  @ApiProperty({
    description: '에러 코드',
    maximum: 499,
    minimum: 400,
  })
  statusCode: number;
  @ApiProperty({ description: '에러 메시지' })
  message: string;
  @ApiProperty({ description: '에러' })
  error: string;
  @ApiProperty({ description: '에러 api 요청 경로' })
  path: string;
  @ApiProperty({
    description: '에러 api 요청 메서드',
    type: String,
    enum: ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
  method: 'HEAD' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}
