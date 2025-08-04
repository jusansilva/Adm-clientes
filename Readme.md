# 🧩 Painel Administrativo - Gestão de Clientes

Este projeto é um painel administrativo completo para cadastro, visualização e gerenciamento de clientes. A aplicação é dividida em front-end (React + Vite) e back-end (NestJS), com banco de dados PostgreSQL e arquitetura escalável baseada em Docker e AWS.

---

## 🚀 Tecnologias Utilizadas

### Front-End:
- React 18 + Vite
- TypeScript
- React Router
- Axios
- Testes com Cypress (diferencial)

### Back-End:
- NestJS
- TypeORM
- PostgreSQL
- Swagger para documentação
- Testes com Jest
- Observabilidade com Prometheus + Grafana (diferencial)
- Mensageria com RabbitMQ (diferencial)

### DevOps:
- Docker + Docker Compose
- AWS (ECS, RDS, S3, CloudWatch)
- CI/CD com GitHub Actions (ou GitLab CI)

---

## 📐 Arquitetura da Solução

           [Usuário]
               ↓
     ┌─────────────────────┐
     │  Frontend React     │
     │  (Vite + Axios)     │
     └────────┬────────────┘
              │ REST API
     ┌────────▼────────────┐
     │   NestJS API        │
     │ Swagger + Testes    │
     │ Docker + RabbitMQ   │
     └────────┬────────────┘
              │ TypeORM
     ┌────────▼────────────┐
     │ PostgreSQL (AWS RDS)│
     └─────────────────────┘

## 📅 Planejamento do Desenvolvimento

A seguir está a estimativa de tempo, equipe e senioridade recomendada para o desenvolvimento deste sistema.

---

### ⏱️ Tempo Estimado

O tempo total estimado para entrega do projeto completo varia entre **3 a 5 semanas**, dependendo da complexidade das melhorias e diferenciais implementados.

| Etapa                                     | Duração Estimada |
|------------------------------------------|------------------|
| Planejamento e arquitetura               | 2 dias           |
| Setup do ambiente com Docker + AWS       | 2 dias           |
| Desenvolvimento do Back-End (NestJS)     | 1 semana         |
| Desenvolvimento do Front-End (React)     | 1 semana         |
| Integrações, testes e melhorias gerais   | 1 semana         |
| Deploy, gravação do vídeo e ajustes finais| 2 a 4 dias       |

---

### 👥 Tamanho da Equipe

- Equipe mínima: **2 desenvolvedores**
  - 1 Desenvolvedor Fullstack (com foco em Back-End)
  - 1 Desenvolvedor Front-End (com integração)

- Equipe ideal: **3 desenvolvedores**
  - 1 Desenvolvedor Back-End
  - 1 Desenvolvedor Front-End
  - 1 DevOps / Engenheiro de Software (foco em infraestrutura, CI/CD e AWS)

---

### 🧠 Senioridade Recomendável

| Papel                        | Nível Recomendado |
|-----------------------------|-------------------|
| Desenvolvedor Back-End      | Pleno a Sênior    |
| Desenvolvedor Front-End     | Pleno             |
| DevOps / Cloud Engineer     | Pleno (com suporte Sênior, se necessário) |

#### Justificativas:
- **Pleno a Sênior no Back-End**: Para lidar com NestJS, TypeORM, PostgreSQL, mensageria e testes.
- **Pleno no Front-End**: Para implementar boas práticas com React + Vite, testes E2E e integração com API.
- **DevOps/Cloud**: Para configurar deploy com


### ▶️ Rodando o projeto

Execute o seguinte comando na raiz do projeto (onde está o `docker-compose.yml`):

```bash
docker-compose up --build