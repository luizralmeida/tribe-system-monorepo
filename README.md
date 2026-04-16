# Tribe System — Monorepo

Sistema de gestão de convidados em eventos.

## Tecnologias

- **Runtime**: Node.js 20+
- **Framework**: NestJS 11
- **Linguagem**: TypeScript (strict)
- **ORM**: TypeORM 0.3
- **Banco**: MySQL 8.0
- **Auth**: JWT + Bcrypt
- **Arquitetura**: Clean Architecture + DDD + SOLID

## Pré-requisitos

- Node.js >= 20
- npm >= 10
- Docker & Docker Compose

## Setup

```bash
# 1. Subir MySQL
docker compose up -d

# 2. Instalar dependências
cd apps/tribe-api
npm install

# 3. Configurar ambiente
cp .env.example .env
# Edite .env conforme necessário

# 4. Iniciar em desenvolvimento
npm run start:dev
```

A API estará disponível em `http://localhost:3000/api`.

## Variáveis de Ambiente

| Variável | Descrição | Default |
|---|---|---|
| `APP_PORT` | Porta da aplicação | `3000` |
| `DB_HOST` | Host do MySQL | `localhost` |
| `DB_PORT` | Porta do MySQL | `3306` |
| `DB_USERNAME` | Usuário do MySQL | `tribe_user` |
| `DB_PASSWORD` | Senha do MySQL | `tribe_pass` |
| `DB_DATABASE` | Nome do banco | `tribe_db` |
| `JWT_SECRET` | Secret para JWT | — |
| `JWT_EXPIRATION` | Expiração do token | `8h` |
| `BCRYPT_SALT_ROUNDS` | Rounds do Bcrypt | `12` |

## Estrutura de Pastas

```
apps/tribe-api/src/
├── config/              # Validação de env
├── shared/              # Domain base, filtros, interceptors, DTOs
└── modules/
    ├── auth/            # Login, JWT, Guards
    ├── user/            # CRUD de usuários
    ├── address/         # Criação/edição de endereços
    ├── event/           # CRUD de eventos, associação user↔event
    └── guest/           # CRUD de convidados, upload xlsx, dashboard, QR
```

Cada módulo segue a estrutura Clean Architecture:
- `domain/` — Entidades, enums, interfaces de repositório
- `application/` — Use cases, DTOs, services
- `infrastructure/` — TypeORM entities/repos, strategies, guards
- `presentation/` — Controllers

## Endpoints Principais

### Auth
| Método | Rota | Role | Descrição |
|---|---|---|---|
| POST | `/api/auth/login` | Público | Login |
| GET | `/api/auth/me` | Autenticado | Dados do usuário logado |

### Users
| Método | Rota | Role | Descrição |
|---|---|---|---|
| POST | `/api/users` | SUPER | Criar usuário |
| GET | `/api/users` | SUPER | Listar usuários |
| GET | `/api/users/:id` | SUPER | Buscar por ID |
| PUT | `/api/users/:id` | SUPER | Atualizar |
| DELETE | `/api/users/:id` | SUPER | Excluir (soft) |

### Events
| Método | Rota | Role | Descrição |
|---|---|---|---|
| POST | `/api/events` | SUPER | Criar evento |
| GET | `/api/events` | ALL | Listar (filtrado por role) |
| GET | `/api/events/:id` | ALL | Buscar por ID |
| GET | `/api/events/:id/users` | SUPER | Evento com usuários |
| PUT | `/api/events/:id` | SUPER | Atualizar |
| DELETE | `/api/events/:id` | SUPER | Excluir (soft) |
| POST | `/api/events/:id/users` | SUPER | Associar usuário |
| DELETE | `/api/events/:id/users/:userId` | SUPER | Desassociar usuário |

### Guests
| Método | Rota | Role | Descrição |
|---|---|---|---|
| GET | `/api/events/:eventId/guests` | ALL | Listar por evento |
| GET | `/api/events/:eventId/guests/dashboard` | ALL | Dashboard |
| POST | `/api/events/:eventId/guests` | SUPER, EDIT | Criar convidado |
| POST | `/api/events/:eventId/guests/upload` | SUPER, EDIT | Upload planilha |
| PUT | `/api/events/:eventId/guests/:id` | SUPER, EDIT | Atualizar |
| DELETE | `/api/events/:eventId/guests/:id` | SUPER, EDIT | Excluir (soft) |
| POST | `/api/guests/confirm/:token` | Público | Confirmar presença |

### Addresses
| Método | Rota | Role | Descrição |
|---|---|---|---|
| POST | `/api/addresses` | SUPER | Criar endereço |
| PUT | `/api/addresses/:id` | SUPER | Atualizar |

## Documentação

Documentação detalhada por módulo disponível em [`docs/`](./docs/).

## Scripts

```bash
npm run start:dev    # Desenvolvimento com watch
npm run build        # Build de produção
npm run lint         # Linting
npm run test         # Testes unitários
```
