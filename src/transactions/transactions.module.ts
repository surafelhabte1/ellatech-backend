import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Products } from 'src/entities/product.entity';
import { Transactions } from 'src/entities/transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions, Users, Products])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
