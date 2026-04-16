# Módulo de Convidados

## Visão Geral
CRUD de convidados por evento, upload de planilhas, dashboard de estatísticas e confirmação pública com QR code.

## Endpoints
| Método | Rota | Role | Descrição |
|---|---|---|---|
| GET | `/api/events/:eventId/guests` | ALL | Listar (paginado + filtros) |
| GET | `/api/events/:eventId/guests/dashboard` | ALL | Dashboard do evento |
| POST | `/api/events/:eventId/guests` | SUPER, EDIT | Criar convidado |
| POST | `/api/events/:eventId/guests/upload` | SUPER, EDIT | Upload planilha xlsx |
| PUT | `/api/events/:eventId/guests/:id` | SUPER, EDIT | Atualizar |
| DELETE | `/api/events/:eventId/guests/:id` | SUPER, EDIT | Soft delete |
| POST | `/api/guests/confirm/:token` | Público | Confirmar presença |

## Filtros (query params)
- `status`: `CONFIRMED` | `NOT_CONFIRMED`
- `name`: busca parcial (LIKE)
- `isChild`: `true` | `false`
- `attended`: `true` | `false`
- `page`, `limit`: paginação

## Dashboard
```json
{ "total": 150, "confirmed": 100, "notConfirmed": 50, "attended": 75 }
```

## Upload de Planilha
- Formato: `.xlsx`
- Multipart form data com campo `file`
- Colunas aceitas (PT-BR ou EN): `nome/name`, `telefone/phone`, `email`, `dependente/isChild`, `responsavel/responsibleName`
- Adultos são inseridos primeiro, depois dependentes com referência ao responsável pelo nome

## Confirmação Pública
1. Gerar token JWT contendo `{ guestId }` (via endpoint futuro ou envio manual)
2. Convidado acessa `POST /api/guests/confirm/:token`
3. Sistema valida token, atualiza status para `CONFIRMED`
4. Retorna dados do convidado + QR code em base64 (data URL)

## Regras de Negócio
- `isChild = true` requer `responsibleId` válido no mesmo evento
- Ao deletar um convidado responsável, seus dependentes são soft-deleted em cascata
- `attended` é controlado pelo sistema (check-in no evento)
