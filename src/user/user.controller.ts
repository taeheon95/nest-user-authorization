import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiFailResponse } from 'src/common/ApiFailResponse';
import { ApiSuccessResponse } from 'src/common/ApiSuccessResponse';
import { UserCreateDTO } from './dto/user.create.dto';
import { UserDTO } from './dto/user.dto';
import { UserUpdateDTO } from './dto/user.update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<ApiSuccessResponse<UserDTO[]>> {
    const users: UserDTO[] = await this.userService.findAllUser();
    return ApiSuccessResponse.successResult(users);
  }

  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiSuccessResponse<UserDTO>> {
    const user: UserDTO = await this.userService.findById(id);
    return ApiSuccessResponse.successResult(user);
  }

  @Post()
  async createUser(@Body() userCreateDTO: UserCreateDTO) {
    const user: UserDTO = await this.userService.createUser(userCreateDTO);
    return ApiSuccessResponse.createResult(user);
  }

  @Put(':userNo')
  async updateUser(
    @Param('userNo', ParseIntPipe) userNo: number,
    @Body() userUpdateDTO: UserUpdateDTO,
  ) {
    const user: UserDTO = await this.userService.updateUser(
      userNo,
      userUpdateDTO,
    );
    return ApiSuccessResponse.successResult(user);
  }
}
