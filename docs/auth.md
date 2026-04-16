# Módulo de Autenticação

## Visão Geral
Responsável pelo login, validação de sessão e controle de acesso via JWT + Bcrypt.

## Fluxo de Autenticação
1. Usuário envia `POST /api/auth/login` com `email` + `password`
2. Sistema valida credenciais (busca user por email, compara hash bcrypt)
3. Retorna JWT (`accessToken`) contendo `{ sub: userId, email, role }`
4. Todas as requisições subsequentes enviam `Authorization: Bearer <token>`
5. `JwtAuthGuard` (global) intercepta e valida o token via `JwtStrategy`
6. `JwtStrategy` chama `ValidateSessionUseCase` para garantir que o usuário ainda está ativo
7. `RolesGuard` (global) verifica se a role do usuário atende ao `@Roles()` do endpoint

## Endpoints
| Método | Rota | Auth | Body |
|---|---|---|---|
| POST | `/api/auth/login` | Público | `{ email, password }` |
| GET | `/api/auth/me` | Bearer | — |

## Guards
- **JwtAuthGuard**: Global. Bypass via `@Public()`.
- **RolesGuard**: Global. Lê `@Roles(UserRole.SUPER, ...)` metadata.

## Componentes
- `LoginUseCase` — Valida credenciais, gera JWT
- `ValidateSessionUseCase` — Verifica se o usuário existe e está ativo
- `BcryptHashService` — Implementação de `IHashService` com bcrypt
- `JwtStrategy` — Passport strategy para extração e validação de JWT
