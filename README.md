# API - Locadora de Veículos

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

API completa para gerenciamento de uma locadora de veículos, desenvolvida com NestJS. O sistema permite o controle de clientes, veículos, vendedores, locações, remessas e devoluções de forma integrada e eficiente.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js progressivo
- **TypeORM** - ORM para TypeScript e JavaScript
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação automática da API
- **Class Validator** - Validação de dados
- **Docker** - Containerização do banco de dados

## 📋 Módulos

A API está organizada nos seguintes módulos principais:

- **Clientes** - Gerenciamento de clientes da locadora
- **Veículos** - Controle do catálogo de veículos
- **Vendedores** - Cadastro e controle de vendedores
- **Locações** - Processamento de locações de veículos
- **Remessas** - Controle de entregas de veículos
- **Devoluções** - Gestão de devoluções de veículos

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker e Docker Compose
- PostgreSQL (via Docker)

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/felipefilp/LocadoraVeiculos-NestJS
cd locacao-de-veiculos-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp env/.development.env
```

Edite o arquivo `env/.development.env` com suas configurações de banco de dados, seguindo o padrão do arquivo `env/.development.env.example`.

4. Inicie o banco de dados PostgreSQL com Docker:

```bash
docker-compose up -d
```

5. Execute a aplicação:

**Modo desenvolvimento:**

```bash
npm run start:dev
```

**Modo produção:**

```bash
npm run start
```

6. Acesse a documentação Swagger:

```
http://localhost:3000/api
```

## 📚 Documentação das Rotas

### Clientes

| Método | Rota                               | Descrição                 |
| ------ | ---------------------------------- | ------------------------- |
| GET    | `/clientes/BuscarTodosClientes`    | Lista todos os clientes   |
| GET    | `/clientes/BuscarCliente/{cpf}`    | Busca cliente por CPF     |
| POST   | `/clientes/CriarCliente`           | Cria novo cliente         |
| PATCH  | `/clientes/AtualizarCliente/{cpf}` | Atualiza dados do cliente |

### Veículos

| Método | Rota                                | Descrição                 |
| ------ | ----------------------------------- | ------------------------- |
| GET    | `/veiculo/BuscarVeiculo/{placa}`    | Busca veículo pela placa  |
| GET    | `/veiculo/BuscarTodosVeiculos`      | Lista todos os veículos   |
| POST   | `/veiculo/CriarVeiculo`             | Cadastra novo veículo     |
| PATCH  | `/veiculo/AtualizarVeiculo/{placa}` | Atualiza dados do veículo |

### Vendedores

| Método | Rota                                | Descrição                  |
| ------ | ----------------------------------- | -------------------------- |
| GET    | `/vendedor/BuscarVendedor/{cpf}`    | Busca vendedor por CPF     |
| GET    | `/vendedor/BuscarTodosVendedores`   | Lista todos os vendedores  |
| POST   | `/vendedor/CriarVendedor`           | Cadastra novo vendedor     |
| PATCH  | `/vendedor/AtualizarVendedor/{cpf}` | Atualiza dados do vendedor |

### Locações

| Método | Rota                             | Descrição                   |
| ------ | -------------------------------- | --------------------------- |
| GET    | `/locacao/BuscarLocacao/{id}`    | Busca locação por ID        |
| GET    | `/locacao/BuscarTodasLocacoes`   | Lista todas as locações     |
| GET    | `/locacao/BuscarLocacoesPorData` | Filtra locações por período |
| POST   | `/locacao/RealizarLocacao`       | Cria nova locação           |
| PATCH  | `/locacao/AtualizarLocacao/{id}` | Atualiza dados da locação   |
| PATCH  | `/locacao/ConcluirLocacao/{id}`  | Finaliza uma locação        |

### Remessas

| Método | Rota                                       | Descrição                     |
| ------ | ------------------------------------------ | ----------------------------- |
| GET    | `/remessa/BuscarRemessa/{id}`              | Busca remessa por ID          |
| GET    | `/remessa/BuscarRemessasPorLocacaoId/{id}` | Lista remessas de uma locação |
| POST   | `/remessa/CriarRemessa`                    | Cria nova remessa             |
| PATCH  | `/remessa/AtualizarRemessa/{id}`           | Atualiza dados da remessa     |
| PATCH  | `/remessa/ConcluirRemessa/{id}`            | Finaliza uma remessa          |

### Devoluções

| Método | Rota                                        | Descrição                         |
| ------ | ------------------------------------------- | --------------------------------- |
| GET    | `/devolucao/BuscarDevolucao/{id}`           | Busca devolução por ID            |
| GET    | `/devolucao/BuscarDevolucaoPorRemessa/{id}` | Busca devolução por ID da remessa |
| POST   | `/devolucao/CriarDevolucao`                 | Registra nova devolução           |
| PATCH  | `/devolucao/AtualizarDevolucao/{id}`        | Atualiza dados da devolução       |
| PATCH  | `/devolucao/ConcluirDevolucao/{id}`         | Finaliza uma devolução            |

## 📊 Planejamento do Projeto

O planejamento e a arquitetura do sistema foram desenvolvidos no Miro. Você pode visualizar o board completo através do link:

[🔗 Acessar Planejamento no Miro](https://miro.com/welcomeonboard/OEpPdzZyTGdTTkNVbXRiN283aGRDMFJCbit3dDkyaExDa2R2NEdSYWJiTjEzUnlQb1FkZHBIZzF1Vk5FZDNlVzVseFhKSkMyTlkxdmtpUG9rUm5UeFBySERNWCtLajdPeGpvUzJ4dk9yU1p3UkJad3dWU2hHbjA3aVRHVVlZb1JQdGo1ZEV3bUdPQWRZUHQzSGl6V2NBPT0hdjE=?share_link_id=271781048964)

## 🗃️ Banco de Dados

O projeto utiliza PostgreSQL como banco de dados. A estrutura é gerenciada pelo TypeORM, que cuida dos relacionamentos entre as entidades.

### Configuração do Docker

O banco de dados é executado em um container Docker. Certifique-se de ter o Docker instalado e em execução antes de iniciar a aplicação.

## 📝 Licença

Este projeto é de uso pessoal e demonstração.  
Você pode utilizá-lo como base para aprendizado e estudo.
