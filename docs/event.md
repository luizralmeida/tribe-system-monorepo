# Módulo de Eventos

## Visão Geral
CRUD de eventos com associação de usuários (N:N) e controle de acesso por role.

## Endpoints
| Método | Rota | Role | Descrição |
|---|---|---|---|
| POST | `/api/events` | SUPER | Criar evento |
| GET | `/api/events` | ALL | Listar eventos |
| GET | `/api/events/:id` | ALL | Buscar por ID |
| GET | `/api/events/:id/users` | SUPER | Evento + usuários associados |
| PUT | `/api/events/:id` | SUPER | Atualizar |
| DELETE | `/api/events/:id` | SUPER | Soft delete |
| POST | `/api/events/:id/users` | SUPER | Associar usuário |
| DELETE | `/api/events/:id/users/:userId` | SUPER | Desassociar usuário |

## Controle de Acesso
- **SUPER**: Visualiza todos os eventos, gerencia associações
- **EDIT/VIEW**: Visualiza apenas eventos aos quais está associado

## Regras de Negócio
- Evento requer endereço válido (`addressId`)
- Tabela `tb_user_event` usa PK composta `(fk_user, fk_event)` — suporta N:N
- Criação e gerenciamento de eventos é exclusivo SUPER
- Deleção é lógica (soft delete)

## Payloads

### Create
```json
{
  "name?": "string",
  "addressId": number,
  "date": "YYYY-MM-DD"
}
```

### Associate User
```json
{
  "userId": number
}
```
