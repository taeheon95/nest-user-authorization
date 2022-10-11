import { Exclude, Expose } from 'class-transformer';

class UserUpdateDTO {
  @Exclude()
  private _userNo: number;
  @Exclude()
  private _email: string;
  @Exclude()
  private _password: string;

  @Expose()
  get userNo() {
    return this._userNo;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get password(): string {
    return this._password;
  }
}

export { UserUpdateDTO };
