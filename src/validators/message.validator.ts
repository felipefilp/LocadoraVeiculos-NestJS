export function IsUniqueMessage(campo: string): string {
  return `O campo '${campo}' é obrigatório.`;
}

export function IsNumberMessage(campo: string): string {
  return `O campo '${campo}' deve ser um valor númerico.`;
}

export function LengthMessage(campo: string, min: number, max: number): string {
  if (min === max) {
    return `O campo '${campo}' deve ter até ${max} caracteres.`;
  } else if (min < max) {
    return `O campo '${campo}' deve ter entre ${min} e ${max} caracteres.`;
  } else {
    return `O campo '${campo}' deve ter entre ${max} e ${min} caracteres.`;
  }
}

export function IsStringMessage(campo: string): string {
  return `O campo '${campo}' deve ser enviado em formato de texto ("").`;
}

export function IsCPFUnicoMessage(campo: string): string {
  return `Já existe um ${campo} cadastrado com este CPF.`;
}

export function NotFoundMessage(campo: string): string {
  return `${campo} não localizado.`;
}

export function TelefoneMessage(): string {
  return 'O telefone deve ter 10 ou 11 dígitos (DDD + número, somente números).';
}
