import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Remessa } from './remessa.entity';
import { Repository } from 'typeorm';
import { RemessaRetornoDto } from './dto/remessas-create-response.dto';
import { plainToInstance } from 'class-transformer';
import { RemessaCriarDto } from './dto/remessas-create.dto';
import { RemessaAtualizarDto } from './dto/remessas-atualizar.dto';
import { NotFoundMessage } from 'src/validators/message.validator';

@Injectable()
export class RemessasService {
  constructor(
    @InjectRepository(Remessa)
    private RemessaRepository: Repository<Remessa>,
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
    const RemessaCriada = this.RemessaRepository.create(RemessaCriarDto);
    const Remessa = await this.RemessaRepository.save(RemessaCriada);
    return plainToInstance(RemessaRetornoDto, Remessa, {
      excludeExtraneousValues: true,
    });
  }
  async ConcluirRemessa(id: number): Promise<RemessaRetornoDto> {
    const RemessaLocalizada = await this.RemessaRepository.findOneBy({ id });
    if (!RemessaLocalizada) {
      throw new NotFoundException(NotFoundMessage('Remessa'));
    }
    RemessaLocalizada.status_locacao = 2;
    return plainToInstance(RemessaRetornoDto, RemessaLocalizada, {
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
