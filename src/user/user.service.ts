import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UserDTO } from './dto/user.dto';
import { UserCreateDTO } from './dto/user.create.dto';
import { UserUpdateDTO } from './dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findAllUser(): Promise<UserDTO[]> {
    const users = await this.userRepository.find({ isDeleted: false });
    const userDTOList: UserDTO[] = users.map((user) => new UserDTO(user));

    return userDTOList;
  }

  async findById(id: number): Promise<UserDTO> {
    const user = await this.userRepository.findOneOrFail(
      {
        userNo: id,
        isDeleted: false,
      },
      {
        failHandler: () => {
          throw new NotFoundException(
            'user is not exist',
            'user find exception',
          );
        },
      },
    );

    return new UserDTO(user);
  }

  async createUser(userCreateDTO: UserCreateDTO) {
    const user: User = new User(userCreateDTO);
    await this.userRepository.persistAndFlush(user);
    return new UserDTO(user);
  }

  async updateUser(userNo: number, userUpdateDTO: UserUpdateDTO) {
    const user: User = await this.userRepository.findOneOrFail(
      {
        userNo,
      },
      {
        failHandler: () => {
          throw new NotFoundException(
            'user is not exist',
            'user find exception',
          );
        },
      },
    );
    user.updateUser(userUpdateDTO);
    return new UserDTO(user);
  }

  async deleteUser(id: number) {
    const user: User = await this.userRepository.findOneOrFail(
      {
        userNo: id,
        isDeleted: false,
      },
      {
        failHandler: () => {
          throw new NotFoundException(
            'user is not exist',
            'user find exception',
          );
        },
      },
    );
    user.deleteUser();
    return user.id;
  }
}
