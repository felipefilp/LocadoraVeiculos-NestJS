import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf: string;

  @Column()
  nome: string;

  @Column()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  numero: number;

  @Column()
  cidade: string;

  @Column()
  siglaEstado: string;

  @Column()
  telefone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  insertedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
