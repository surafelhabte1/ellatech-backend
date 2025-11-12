import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateTransactionDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const transaction = this.transactionRepo.create({
      user: user,
      product: product,
      quantity: dto.quantity,
      totalAmount: (product?.price || 0) * dto.quantity,
    });

    return this.transactionRepo.save(transaction);
  }

  findAll() {
    return this.transactionRepo.find({ relations: ['user', 'product'] });
  }

  findOne(id: number) {
    return this.transactionRepo.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
  }

  update(id: number, dto: UpdateTransactionDto) {
    return this.transactionRepo.update(id, dto);
  }

  remove(id: number) {
    return this.transactionRepo.delete(id);
  }
}
