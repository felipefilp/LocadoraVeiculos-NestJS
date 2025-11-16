import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Devolucao } from './devolucao.entity';
import { DevolucaoRetornoDto } from './dto/devolucao-create-response.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundMessage } from 'src/validators/message.validator';
import { DevolucaoCriarDto } from './dto/devolucao-create.dto';
import { DevolucaoAtualizarDto } from './dto/devolucao-atualizar.dto';

@Injectable()
export class DevolucoesService {
  constructor(
    @InjectRepository(Devolucao)
    private readonly DevolucaoRepository: Repository<Devolucao>,
  ) {}

  async BuscarDevolucaoById(id: number): Promise<DevolucaoRetornoDto> {
    const DevolucaoLocalizada = await this.DevolucaoRepository.findOneBy({
      id,
    });
    if (!DevolucaoLocalizada) {
      throw new NotFoundException(NotFoundMessage('Devolução'));
    }
    return plainToInstance(DevolucaoRetornoDto, DevolucaoLocalizada, {
      excludeExtraneousValues: true,
    });
  }

  async BuscarDevolucaoByRemessaId(
    id_remessa: number,
  ): Promise<DevolucaoRetornoDto> {
    const DevolucaoLocalizada = await this.DevolucaoRepository.findOne({
      where: {
        id_remessa: {
          id: id_remessa,
        },
      },
      relations: { id_remessa: true },
    });

    if (!DevolucaoLocalizada) {
      throw new NotFoundException(NotFoundMessage('Devolução'));
    }

    if (!DevolucaoLocalizada.id_remessa) {
      throw new NotFoundException(NotFoundMessage('Remessa'));
    }

    return plainToInstance(DevolucaoRetornoDto, DevolucaoLocalizada, {
      excludeExtraneousValues: true,
    });
  }

  async CriarDevolucao(
    DevolucaoCriarDto: DevolucaoCriarDto,
  ): Promise<DevolucaoRetornoDto> {
    const DevolucaoCriada = this.DevolucaoRepository.create(DevolucaoCriarDto);
    const DevolucaoSalva = await this.DevolucaoRepository.save(DevolucaoCriada);
    return plainToInstance(DevolucaoRetornoDto, DevolucaoSalva, {
      excludeExtraneousValues: true,
    });
  }

  async AtualizarDevolucao(
    id: number,
    DevolucaoAtualizarDto: DevolucaoAtualizarDto,
  ): Promise<DevolucaoRetornoDto> {
    const DevolucaoLocalizada = await this.DevolucaoRepository.findOneBy({
      id,
    });
    if (!DevolucaoLocalizada) {
      throw new NotFoundException(NotFoundMessage('Devolução'));
    }
    Object.assign(DevolucaoLocalizada, DevolucaoAtualizarDto);
    const DevolucaoAtualizada =
      await this.DevolucaoRepository.save(DevolucaoLocalizada);
    return plainToInstance(DevolucaoRetornoDto, DevolucaoAtualizada, {
      excludeExtraneousValues: true,
    });
  }

  async ConcluirDevolucao(id: number): Promise<DevolucaoRetornoDto> {
    const DevolucaoLocalizada = await this.DevolucaoRepository.findOne({
      where: { id },
      relations: { id_remessa: true },
    });
    // Verifica se a devolução existe
    if (!DevolucaoLocalizada) {
      throw new NotFoundException(NotFoundMessage('Devolução'));
    }
    // Verifica se a remessa vinculada está concluida

    if (DevolucaoLocalizada.id_remessa.status_locacao === 1) {
      throw new HttpException(
        `A remessa ${DevolucaoLocalizada.id_remessa.id} que possui vinculo com esta devolução, não está concluida.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    DevolucaoLocalizada.status_devolucao = 2;
    DevolucaoLocalizada.data_devolucao = new Date();
    const DevolucaoSalva =
      await this.DevolucaoRepository.save(DevolucaoLocalizada);
    return plainToInstance(DevolucaoRetornoDto, DevolucaoSalva, {
      excludeExtraneousValues: true,
    });
  }
}
