# Módulo de Localidades (Endereços)

## Visão Geral
Criação e edição de endereços vinculados a eventos. Restrito à role SUPER.

## Endpoints
| Método | Rota | Role | Descrição |
|---|---|---|---|
| POST | `/api/addresses` | SUPER | Criar endereço |
| PUT | `/api/addresses/:id` | SUPER | Atualizar endereço |

## Estados Brasileiros
O campo `state` aceita as 27 UFs: AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO.

## Payload

### Create
```json
{
  "name?": "string",
  "street": "string",
  "neighborhood": "string",
  "number": "string (max 10)",
  "complement": "string",
  "city": "string",
  "state": "SP",
  "country": "Brasil"
}
```

### Update (todos opcionais)
Mesmos campos do Create, todos opcionais.
