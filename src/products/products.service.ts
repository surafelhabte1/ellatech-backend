import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseService } from '../bases/base.service';
import { Products } from '../entities/product.entity';

@Injectable()
export class ProductsService extends BaseService<
  Products,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
  ) {
    super(productRepo);
  }

  getStatus(productId: number) {
    return this.productRepo.findOne({
      where: { id: productId },
      select: ['id', 'status'],
    });
  }
}
