import { Locacao } from 'src/locacoes/locacao.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  inserted_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Locacao, (locacao) => locacao.id_cliente)
  locacoes: Locacao[];
}
