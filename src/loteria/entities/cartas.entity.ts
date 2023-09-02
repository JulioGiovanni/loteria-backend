export class Loteria {}
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Tablas } from './tablas.entity';

@Entity('carta')
export class Cartas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  nombre: string;

  @ManyToMany(() => Tablas, (tabla) => tabla.cartas)
  tablas: Tablas[];
}
