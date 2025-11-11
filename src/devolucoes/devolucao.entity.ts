import { Remessa } from 'src/remessas/remessa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Devolucao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true, default: null })
  data_devolucao: Date;

  @Column({ default: 1 })
  status_devolucao: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  inserted_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => Remessa, (remessa) => remessa.id)
  @JoinColumn({ name: 'id_remessa' })
  id_remessa: Remessa;
}
