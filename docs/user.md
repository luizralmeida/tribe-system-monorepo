# Módulo de Usuários

## Visão Geral
CRUD completo de usuários com hash de senha. Todos os endpoints são restritos à role SUPER.

## Endpoints
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/users` | Criar usuário |
| GET | `/api/users` | Listar (paginado) |
| GET | `/api/users/:id` | Buscar por ID |
| PUT | `/api/users/:id` | Atualizar |
| DELETE | `/api/users/:id` | Soft delete |

## Regras de Negócio
- Email e telefone devem ser únicos
- Senha é hasheada com bcrypt antes de persistir
- Ao atualizar a senha, re-hasheia automaticamente
- Deleção é lógica (soft delete via `deleted_at`)

## Roles
`SUPER` | `EDIT` | `VIEW`

## Payloads

### Create
```json
{
  "name": "string",
  "password": "string (min 6)",
  "phone": "string (max 20)",
  "email": "string (email)",
  "role": "SUPER | EDIT | VIEW",
  "active": true
}
```

### Update (todos opcionais)
```json
{
  "name?": "string",
  "password?": "string",
  "phone?": "string",
  "email?": "string",
  "role?": "SUPER | EDIT | VIEW",
  "active?": boolean
}
```
