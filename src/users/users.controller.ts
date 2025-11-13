import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from '../bases/base.controller';

@Controller('users')
export class UsersController extends BaseController<
  CreateUserDto,
  UpdateUserDto,
  any
> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
