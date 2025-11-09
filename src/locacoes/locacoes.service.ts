/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Locacao } from './locacao.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { RealizarLocacaoDto } from './dto/locacao-create.dto';
import { LocacaoRetornoDto } from './dto/locacao-create-response.dto';
import { plainToInstance } from 'class-transformer';
import { ClientesService } from 'src/clientes/clientes.service';
import { LocacaoAtualizarDto } from './dto/locacao-atualizar.dto';

@Injectable()
export class LocacoesService {
  constructor(
    @InjectRepository(Locacao)
    private LocacaoRepository: Repository<Locacao>,
    private readonly ClienteService: ClientesService,
  ) {}

  async getLocacaoById(id: number): Promise<LocacaoRetornoDto> {
    const LocacaoLocalizada = await this.LocacaoRepository.findOneBy({ id });
    if (!LocacaoLocalizada) {
      throw new NotFoundException('Locação não encontrada.');
    }
    return plainToInstance(LocacaoRetornoDto, LocacaoLocalizada, {
      excludeExtraneousValues: true,
    });
  }

  async getAllLocacoes(): Promise<LocacaoRetornoDto[]> {
    const LocacoesLocalizadas = await this.LocacaoRepository.find();
    return plainToInstance(LocacaoRetornoDto, LocacoesLocalizadas, {
      excludeExtraneousValues: true,
    });
  }

  async getLocacoesPorData(
    data_inicio: Date,
    data_fim?: Date | null,
  ): Promise<LocacaoRetornoDto[]> {
    const whereClause: any = {};

    if (data_fim) {
      if (data_inicio > data_fim) {
        throw new NotAcceptableException(
          'Data de início não pode ser maior que a data de fim.',
        );
      }
      whereClause.data_inicio = MoreThanOrEqual(data_inicio);
      whereClause.data_fim = LessThanOrEqual(data_fim);
    } else {
      whereClause.data_inicio = MoreThanOrEqual(data_inicio);
      whereClause.data_fim = null;
    }

    const LocacaoPorData = await this.LocacaoRepository.find({
      where: whereClause,
    });
    return plainToInstance(LocacaoRetornoDto, LocacaoPorData, {
      excludeExtraneousValues: true,
    });
  }

  async createLocacao(
    RealizarLocacaoDto: RealizarLocacaoDto,
  ): Promise<LocacaoRetornoDto> {
    const cliente = await this.ClienteService.findOneClienteById(
      Number(RealizarLocacaoDto.id_cliente),
    );
    if (!cliente) {
      throw new NotFoundException('Cliente não cadastrado.');
    }
    const LocacaoCriada = this.LocacaoRepository.create(RealizarLocacaoDto);
    const Locacao = await this.LocacaoRepository.save(LocacaoCriada);
    return plainToInstance(LocacaoRetornoDto, Locacao, {
      excludeExtraneousValues: true,
    });
  }

  async concluirLocacao(id: number): Promise<LocacaoRetornoDto> {
    const Locacao = await this.LocacaoRepository.findOneBy({ id });
    if (!Locacao) {
      throw new NotFoundException('Locação não encontrada.');
    }
    Locacao.status_locacao = 2;
    Locacao.data_fim = new Date();
    const LocacaoSalva = await this.LocacaoRepository.save(Locacao);
    return plainToInstance(LocacaoRetornoDto, LocacaoSalva, {
      excludeExtraneousValues: true,
    });
  }

  async atualizarLocacao(
    id: number,
    AtualizarLocacaoDto: LocacaoAtualizarDto,
  ): Promise<LocacaoRetornoDto> {
    const LocacaoLocalizada = await this.LocacaoRepository.findOneBy({ id });
    if (!LocacaoLocalizada) {
      throw new NotFoundException('Locação não encontrada.');
    }
    Object.assign(LocacaoLocalizada, AtualizarLocacaoDto);
    const Locacao = await this.LocacaoRepository.save(LocacaoLocalizada);
    return plainToInstance(LocacaoRetornoDto, Locacao, {
      excludeExtraneousValues: true,
    });
  }
}
