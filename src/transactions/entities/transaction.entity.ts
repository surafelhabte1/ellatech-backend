import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from "../../users/entities/user.entity"
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @Column()
  totalAmount: number;
}
