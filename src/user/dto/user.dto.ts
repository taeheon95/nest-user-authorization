import { User } from '../user.entity';
import { Exclude, Expose } from 'class-transformer';

class UserDTO {
  @Exclude() private _userNo: number;
  @Exclude() private _id: string;
  @Exclude() private _email: string;
  @Exclude() private _password: string;
  @Exclude() private _createAt: Date;
  @Exclude() private _updateAt: Date;

  constructor(user: User) {
    this._userNo = +user.userNo;
    this._id = user.id;
    this._email = user.email;
    this._password = user.password;
    this._createAt = user.createAt;
    this._updateAt = user.updateAt;
  }

  @Expose()
  get userNo(): number {
    return this._userNo;
  }

  @Expose()
  get id(): string {
    return this._id;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get password(): string {
    return this._password;
  }

  @Expose()
  get createAt(): Date {
    return this._createAt;
  }

  @Expose()
  get updateAt(): Date {
    return this._updateAt;
  }
}

export { UserDTO };
