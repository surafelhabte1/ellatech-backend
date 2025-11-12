import {
  Body,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

export interface BaseService<TCreateDto = any, TUpdateDto = any> {
  create(dto: TCreateDto): Promise<any>;
  findAll(): Promise<any[]>;
  findOne(id: number): Promise<any | null>;
  update(id: number, dto: TUpdateDto): Promise<{ affected?: number }>;
  remove(id: number): Promise<{ affected?: number }>;
}

export abstract class BaseController<
  TCreateDto = any,
  TUpdateDto = any,
  TService extends BaseService<TCreateDto, TUpdateDto> = BaseService<
    TCreateDto,
    TUpdateDto
  >,
> {
  constructor(protected readonly service: TService) {}

  @Post()
  async create(@Body() dto: TCreateDto) {
    try {
      const result = await this.service.create(dto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Success',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error',
        error: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const results = await this.service.findAll();
      if (!results || results.length === 0) {
        return {
          statusCode: HttpStatus.NO_CONTENT,
          message: 'No records found',
          data: [],
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: results,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const result = await this.service.findOne(id);
      if (!result) {
        throw new NotFoundException('Item not found');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error',
        error: error.message,
      };
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: TUpdateDto) {
    try {
      const result = await this.service.update(id, dto);
      if (result.affected === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Item with id ${id} not found`,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await this.service.remove(id);
      if (result.affected === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Item with id ${id} not found`,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error',
        error: error.message,
      };
    }
  }
}
