import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import * as CryptoJS from 'crypto-js';
import { UserCreateDTO } from './dto/user.create.dto';
import { UserUpdateDTO } from './dto/user.update.dto';

@Entity({ tableName: 't_user' })
export class User {
  @PrimaryKey({ autoincrement: true, columnType: 'bigint', name: 'user_no' })
  private _userNo!: number;

  @Property({ nullable: false, unique: true, name: 'id' })
  private _id!: string;

  @Property({ nullable: false, name: 'email' })
  private _email!: string;

  @Property({ nullable: false, name: 'password' })
  private _password!: string;

  @Property({ nullable: false, default: false, name: 'is_deleted' })
  private _isDeleted!: boolean;

  @Property({ defaultRaw: 'now()', name: 'create_at' })
  private _createAt!: Date;

  @Property({
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
    name: 'update_at',
  })
  private _updateAt!: Date;

  constructor(userCreateDTO: UserCreateDTO) {
    this._id = userCreateDTO.id;
    this._email = userCreateDTO.email;
    this._password = CryptoJS.SHA256(userCreateDTO.password).toString();
  }

  updateUser(userUpdateDTO: UserUpdateDTO) {
    this._email = userUpdateDTO.email;
    this._password = CryptoJS.SHA256(userUpdateDTO.password).toString();
  }

  deleteUser() {
    this._isDeleted = true;
  }

  get userNo() {
    return this._userNo;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  get createAt() {
    return this._createAt;
  }

  get updateAt() {
    return this._updateAt;
  }
}
