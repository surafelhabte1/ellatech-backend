import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from "../../users/entities/user.entity"
import { Products } from '../../products/entities/product.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id, { eager: true })
  user: Users;

  @ManyToOne(() => Products, (product) => product.id, { eager: true })
  product: Products;

  @Column()
  quantity: number;

  @Column()
  totalAmount: number;
}
