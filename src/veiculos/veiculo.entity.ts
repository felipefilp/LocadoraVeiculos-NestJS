import { Remessa } from 'src/remessas/remessa.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelo: string;

  @Column()
  marca: string;

  @Column()
  placa: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor_base?: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  inserted_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Remessa, (remessa) => remessa.id_veiculo)
  id_veiculo: Remessa;
}
