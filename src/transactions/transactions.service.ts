import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transactions } from './entities/transactions.entity';
import { BaseService } from 'src/bases/base.service';

@Injectable()
export class TransactionsService extends BaseService<
  Transactions,
  CreateTransactionDto,
  UpdateTransactionDto
> {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionRepo: Repository<Transactions>,
  ) {
    super(transactionRepo);
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
}
