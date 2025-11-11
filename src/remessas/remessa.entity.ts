import { Devolucao } from 'src/devolucoes/devolucao.entity';
import { Locacao } from 'src/locacoes/locacao.entity';
import { Veiculo } from 'src/veiculos/veiculo.entity';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Remessa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  status_locacao: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.0 })
  valor_remessa: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  inserted_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Locacao)
  @JoinColumn({ name: 'id_locacao' })
  id_locacao: Locacao;

  @ManyToOne(() => Veiculo)
  @JoinColumn({ name: 'id_veiculo' })
  id_veiculo: Veiculo;

  @OneToOne(() => Devolucao)
  @JoinColumn({ name: 'id_devolucao' })
  id_devolucao: Devolucao;
}
