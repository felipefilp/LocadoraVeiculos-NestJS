/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import moment from 'moment';

export class BuscarLocacoesPorDataDto {
  @ApiProperty()
  @Transform(({ value }) => {
    const parsed = moment(value, ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD'], true);
    return parsed.isValid() ? parsed.toDate() : null;
  })
  @IsDate()
  data_inicio: Date;

  @ApiProperty()
  @Transform(({ value }) =>
    value ? moment(value, 'YYYY-MM-DD HH:mm:ss', true).toDate() : null,
  )
  @IsOptional()
  @IsDate()
  data_fim?: Date | null;
}
