import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserCreateDTO {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _email: string;
  @Exclude() private readonly _password: string;

  @ApiProperty({ description: '유저 id' })
  @Expose()
  get id() {
    return this._id;
  }

  @ApiProperty({ description: '유저 email' })
  @Expose()
  get email() {
    return this._email;
  }

  @ApiProperty({ description: '유저 비밀번호' })
  @Expose()
  get password() {
    return this._password;
  }
}
