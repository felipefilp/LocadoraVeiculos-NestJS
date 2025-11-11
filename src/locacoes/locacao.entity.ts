import { Cliente } from 'src/clientes/cliente.entity';
import { Remessa } from 'src/remessas/remessa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Locacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  data_inicio: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  data_fim: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  inserted_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;

  @Column({ default: 1 })
  status_locacao?: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.0 })
  valor_locacao?: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  id_cliente: Cliente;

  @OneToMany(() => Remessa, (remessa) => remessa.id)
  Remessas: Remessa[];
}
