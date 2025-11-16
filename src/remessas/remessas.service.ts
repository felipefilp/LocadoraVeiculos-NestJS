/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Remessa } from './remessa.entity';
import { Repository } from 'typeorm';
import { RemessaRetornoDto } from './dto/remessas-create-response.dto';
import { plainToInstance } from 'class-transformer';
import { RemessaCriarDto } from './dto/remessas-create.dto';
import { RemessaAtualizarDto } from './dto/remessas-atualizar.dto';
import { NotFoundMessage } from 'src/validators/message.validator';
import { Locacao } from 'src/locacoes/locacao.entity';
import { Veiculo } from 'src/veiculos/veiculo.entity';

@Injectable()
export class RemessasService {
  constructor(
    @InjectRepository(Remessa)
    private RemessaRepository: Repository<Remessa>,

    @InjectRepository(Locacao)
    private LocacaoRepository: Repository<Locacao>,

    @InjectRepository(Veiculo)
    private VeiculoRepository: Repository<Veiculo>,
  ) {}

  async BuscarRemessaPorIdRemessa(id: number): Promise<RemessaRetornoDto> {
    const RemessaLocalizada = await this.RemessaRepository.findOneBy({ id });
    return plainToInstance(RemessaRetornoDto, RemessaLocalizada, {
      excludeExtraneousValues: true,
    });
  }

  async BuscarRemessaPorIdLocacao(
    id_locacao: number,
  ): Promise<RemessaRetornoDto[]> {
    const RemessasLocalizadas = await this.RemessaRepository.findBy({
      id_locacao: { id: id_locacao },
    });
    return plainToInstance(RemessaRetornoDto, RemessasLocalizadas, {
      excludeExtraneousValues: true,
    });
  }

  async CriarRemessa(
    RemessaCriarDto: RemessaCriarDto,
  ): Promise<RemessaRetornoDto> {
    const Locacao = await this.LocacaoRepository.findOneBy({
      id: Number(RemessaCriarDto.id_locacao),
    });
    if (!Locacao) {
      throw new NotFoundException(NotFoundMessage('Locação'));
    }

    const Veiculo = await this.VeiculoRepository.findOneBy({
      id: Number(RemessaCriarDto.id_veiculo),
    });

    if (!Veiculo) {
      throw new NotFoundException(NotFoundMessage('Veiculo'));
    }
    const RemessaCriada = this.RemessaRepository.create(RemessaCriarDto);
    const Remessa = await this.RemessaRepository.save(RemessaCriada);
    await this.LocacaoRepository.increment(
      {
        id: Remessa.id_locacao.id,
      },
      'valor_locacao',
      Remessa.valor_remessa,
    );
    return plainToInstance(RemessaRetornoDto, Remessa, {
      excludeExtraneousValues: true,
    });
  }

  async ConcluirRemessa(id: number): Promise<RemessaRetornoDto> {
    const RemessaLocalizada = await this.RemessaRepository.findOneBy({ id });
    // Verifica se a remessa existe
    if (!RemessaLocalizada) {
      throw new NotFoundException(NotFoundMessage('Remessa'));
    }
    // Verifica se já está concluida (2)
    if (RemessaLocalizada.status_locacao === 2) {
      throw new HttpException(
        `A remessa ${RemessaLocalizada.id} já está concluida.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    RemessaLocalizada.status_locacao = 2;
    const RemessaSalva = this.RemessaRepository.save(RemessaLocalizada);
    return plainToInstance(RemessaRetornoDto, RemessaSalva, {
      excludeExtraneousValues: true,
    });
  }

  async UpdateRemessa(
    id: number,
    RemessaAtualizarDto: RemessaAtualizarDto,
  ): Promise<RemessaRetornoDto> {
    const RemessaLocalizada = await this.RemessaRepository.findOneBy({ id });
    if (!RemessaLocalizada) {
      throw new NotFoundException(NotFoundMessage('Remessa'));
    }
    Object.assign(RemessaLocalizada, RemessaAtualizarDto);
    const RemessaAtualizada = this.RemessaRepository.save(RemessaLocalizada);
    return plainToInstance(RemessaRetornoDto, RemessaAtualizada, {
      excludeExtraneousValues: true,
    });
  }
}
