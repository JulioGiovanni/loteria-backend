import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cartas } from './cartas.entity';

@Entity('tabla')
export class Tablas {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Cartas, (carta) => carta.tablas)
  @JoinTable()
  cartas: Cartas[];
}
