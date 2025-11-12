import { IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
