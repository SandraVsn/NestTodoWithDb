import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;
}
