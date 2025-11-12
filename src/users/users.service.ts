import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '../bases/base.service';

@Injectable()
export class UsersService extends BaseService<
  Users,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {
    super(userRepo);
  }
}
