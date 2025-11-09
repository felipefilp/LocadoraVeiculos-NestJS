/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class CpfUnico implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async validate(cpf: string, args: ValidationArguments) {
    const entity = args.constraints[0];
    const repository = this.dataSource.getRepository(entity);

    const existing = await repository.findOne({ where: { cpf } });
    return !existing;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Já existe um registro de ${args.constraints[0]} com o CPF informado.`;
  }
}

export function IsCpfUnico(entity: any, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: CpfUnico,
    });
  };
}
