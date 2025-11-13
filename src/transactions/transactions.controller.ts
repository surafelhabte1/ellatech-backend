import { Controller } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { BaseController } from '../bases/base.controller';

@Controller('transactions')
export class TransactionsController extends BaseController<
  CreateTransactionDto,
  UpdateTransactionDto,
  any
> {
  constructor(private readonly transactionsService: TransactionsService) {
    super(transactionsService);
  }
}
