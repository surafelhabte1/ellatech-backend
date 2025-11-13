import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ default: 'available' })
  status: string;
}
