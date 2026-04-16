# Contexto do Projeto: Tribe System Monorepo

Este documento serve como a única fonte de verdade para agentes de IA que atuam no desenvolvimento do Tribe System. Siga rigorosamente as diretrizes aqui estabelecidas para garantir a integridade arquitetural e a qualidade do código.

---

## 1. Visão Geral
O **Tribe System** é uma plataforma robusta de gestão de convidados para eventos. O objetivo central é oferecer aos organizadores (Producers/Super Users) o controle total sobre a lista de presença, validação de entradas via QR Code, dashboard de métricas em tempo real e automação de convites.

**Valor de Negócio:**
- **Escalabilidade:** Suporte a grandes volumes de convidados via upload de planilhas.
- **Segurança:** Controle de acesso granular (RBAC) para diferentes perfis de usuários.
- **Engajamento:** Fluxo simplificado de confirmação de presença para o convidado final.

---

## 2. Stack Tecnológica
O projeto é um monorepo estruturado com as seguintes tecnologias:

### Backend (apps/tribe-api)
- **Runtime:** Node.js 20+
- **Framework:** NestJS 11
- **Linguagem:** TypeScript (Strict Mode)
- **ORM:** TypeORM 0.3.x (MySQL 8.0)
- **Autenticação:** JWT + Passport + Bcrypt
- **Validação:** class-validator + class-transformer

### Frontend (apps/tribe-front)
- **Framework:** Vue.js 3.5+ (Composition API + `<script setup>`)
- **Build Tool:** Vite 8.x
- **State Management:** Pinia 3.x
- **Estilização:** Tailwind CSS 4.x
- **Icons:** Lucide Vue Next
- **HTTP Client:** Axios

---

## 3. Arquitetura e Padrões
A aplicação segue os princípios de **Clean Architecture** e **DDD (Domain-Driven Design)** para garantir o desacoplamento e a testabilidade.

### Camadas do Backend (Per Module)
1.  **Domain:** Contém as entidades de negócio, enums e interfaces de repositórios. Deve ser agnóstica a frameworks.
2.  **Application:** Contém as regras de aplicação, Use Cases (Services) e DTOs de entrada/saída.
3.  **Infrastructure:** Implementações concretas (TypeORM Repositories), estratégias de autenticação, Guards e integração com libs externas.
4.  **Presentation:** Controllers que expõem a API REST.

### Frontend
- **Atomic Components:** Componentes reutilizáveis e estilizados de forma consistente.
- **Store-First Logic:** Lógica de estado centralizada no Pinia para dados compartilhados.
- **Service Layer:** Abstração de chamadas HTTP para isolar a API do componente.

---

## 4. Padrões de Código

### Nomenclatura e Estilo
- **Classes:** PascalCase (ex: `CreateUserUseCase`).
- **Funções/Variáveis:** camelCase (ex: `guestStatus`).
- **Arquivos:** kebab-case (ex: `user-response.dto.ts`).
- **Tipagem:** Interfaces são preferidas para contratos de dados; Types para uniões/interseções complexas.

### Tratamento de Erros
- **Backend:** Utiliza o `GlobalExceptionFilter` para padronizar respostas de erro. Lançar `HttpException` (ou subclasses) com mensagens claras.
- **Frontend:** Interceptor de Axios para capturar erros 401 (logout automático) e exibir notificações contextuais.

### Validação
- **Backend:** Uso obrigatório de DTOs com `class-validator` para todas as entradas de rede (`@Body`, `@Query`).
- **Injeção de Dependências:** Sempre injetar interfaces (quando possível) ou classes concretas via constructor injection do NestJS.

---

## 5. Observabilidade
- **Logs:** Utilizar o `Logger` nativo do NestJS para eventos críticos (erros de banco, falhas de autenticação).
- **Monitoramento:** As rotas devem ser bem definidas para facilitar o rastreamento via APM se necessário no futuro.
- **Tratamento Global:** Nenhum erro deve "escapar" sem ser capturado pelo filtro global de exceções.

---

## 6. Guia de Contribuição para IAs

Ao sugerir mudanças ou implementar novas funcionalidades, a IA deve:
1.  **Testes Primeiro:** Sempre que possível, proponha a estrutura de testes unitários (`.spec.ts`) antes da implementação do Use Case.
2.  **Layers Strict:** Nunca coloque lógica de banco de dados (TypeORM) dentro do Domain ou Controller. A lógica reside no Repository (Infra) orquestrada pelo Use Case (Application).
3.  **SOLID:** Respeite o Princípio de Responsabilidade Única. Funções no backend não devem ultrapassar 40 linhas (conforme regra de ouro do projeto).
4.  **Documentação:** Se criar um novo endpoint, atualize o `README.md` ou o contexto se a mudança for estrutural.
5.  **Clean Code:** Evite comentários óbvios. O código deve ser autoexplicativo através de nomes de variáveis e funções semânticos.
6.  **Context Aware:** Antes de criar algo novo, verifique se já existe um `shared/` ou `infrastructure/` que resolva o problema.

---
*Assinado: Arquiteto de Software System Tribe.*
