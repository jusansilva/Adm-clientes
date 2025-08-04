# Teddy Test - Backend

Backend desenvolvido em [NestJS](https://nestjs.com/) para gerenciamento de clientes, utilizando PostgreSQL e TypeORM.

## Funcionalidades

- CRUD de clientes (criar, listar, editar, excluir)
- Integração com banco de dados PostgreSQL
- Testes unitários e end-to-end
- Configuração via Docker Compose

## Requisitos

- Node.js >= 18
- PostgreSQL (recomendado rodar via Docker)
- Docker e Docker Compose (opcional)

## Instalação

```bash
npm install
```

## Configuração do Banco de Dados

O projeto utiliza variáveis de ambiente para conexão com o banco.  
Exemplo de configuração no `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=clientesdb
```

Você pode subir o banco com Docker Compose:

```bash
docker-compose up db
```

## Executando o projeto

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

## Testes

```bash
# Testes unitários
npm run test

# Testes end-to-end
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## Endpoints principais

- `POST /client` - Cria um novo cliente
- `GET /client` - Lista todos os clientes
- `GET /client/:id` - Busca cliente por ID
- `PUT /client/:id` - Atualiza cliente
- `DELETE /client/:id` - Remove cliente

## Estrutura

- `src/client` - Módulo principal de clientes
- `test/` - Testes end-to-end

## Licença

MIT

---

Projeto desenvolvido para fins de teste técnico.
