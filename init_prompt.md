Atue como um arquiteto de software senior, especialista em clean architecture, ddd, clean code e ecossistema node.

Preciso que trabalhe nesse monorepo para criarmos um sistema responsável pela gestão de convidados em eventos.


## Contexto

Esse é o monorepo de um sistema que iniciaremos o desenvolvimento. Seu intuito é servir como um sistema de gestão de convidados em eventos, havendo em seu domínio eventos, localidade dos eventos, convidados e dependentes dos convidados.

É desejado que o usuário do sistema cuja role seja diferente de SUPER esteja vinculado a ao menos um evento para que possa visualizar, criar, editar ou excluir convidados e seus dependentes a depender de sua role.

O usuário com role diferente de super deve ter acesso apenas ao eventos em que encontra-se vinculado e deve possuir a permissão de visualizar um dash contendo as informações dos convidados, como quantidade total, quantidade de confirmados e quantidade de convidados presentes.

O usuário com role igual a SUPER deve ter a permissão de visualizar e gerenciar todos os eventos.

Além de tudo isso, o sistema deve permitir o acesso por parte dos convidados, onde poderão confirmar sua presença e obter o qr-code de seus convites (identificador na entrada do evento).

## Arquitetura desejada

Repositório backend em NestJS utilizando Clean Architecture, DDD como seu design principal e práticas de clean code e solid.

É esperado que sejam utilizadas as últimas versões de todas as libs e tecnologias relacionadas ao projeto. 

### DDL do banco de dados

CREATE TABLE `tb_user`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL, -- hashed
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` ENUM('SUPER', 'EDIT', 'VIEW') NOT NULL,
    `active` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP,
    `deleted_at` TIMESTAMP
);
ALTER TABLE
    `tb_user` ADD UNIQUE `tb_user_phone_unique`(`phone`);
ALTER TABLE
    `tb_user` ADD UNIQUE `tb_user_email_unique`(`email`);
CREATE TABLE `tb_event`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NULL,
    `fk_address` BIGINT UNSIGNED NOT NULL,
    `date` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP,
    `deleted_at` TIMESTAMP
);
CREATE TABLE `tb_user_event`(
    `fk_user` BIGINT UNSIGNED NOT NULL,
    `fk_event` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY(`fk_event`),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP,
    `deleted_at` TIMESTAMP
);
ALTER TABLE
    `tb_user_event` COMMENT = 'Represents the relation between event''s owner and event.';
CREATE TABLE `tb_guest`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `status` ENUM('CONFIRMED', 'NOT_CONFIRMED') NOT NULL DEFAULT 'NOT_CONFIRMED',
    `attended` BOOLEAN NOT NULL,
    `fk_event` BIGINT UNSIGNED NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `fk_responsible` BIGINT UNSIGNED NOT NULL --self reference, no need of actual fk,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP,
    `deleted_at` TIMESTAMP,
    `is_child` BOOLEAN NOT NULL
);
CREATE TABLE `tb_address`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NULL,
    `street` VARCHAR(255) NOT NULL,
    `neighborhood` VARCHAR(255) NOT NULL,
    `number` VARCHAR(10) NOT NULL,
    `complement` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` ENUM('') NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP
);
ALTER TABLE
    `tb_user_event` ADD CONSTRAINT `tb_user_event_fk_user_foreign` FOREIGN KEY(`fk_user`) REFERENCES `tb_user`(`id`);
ALTER TABLE
    `tb_user_event` ADD CONSTRAINT `tb_user_event_fk_event_foreign` FOREIGN KEY(`fk_event`) REFERENCES `tb_event`(`id`);
ALTER TABLE
    `tb_event` ADD CONSTRAINT `tb_event_fk_address_foreign` FOREIGN KEY(`fk_address`) REFERENCES `tb_address`(`id`);

## Práticas esperadas

- Clean Architecture
- Clean code
- Solid
- Typescript fortmente tipado
- Use cases não devem chamar use-cases. Utilize services onde essa prática for necessária.
- Boas práticas do Nest.
- Boas práticas

## Entregáveis esperados

Iniciaremos pelo backend, portanto nesse primeiro momento é esperado um plano de implementação contendo:

1. Módulo de autenticação completo utilizando Bcrypt. É imprescindível que seja implementado como componente desse módulo o Authguard, que valide o jwt token armazenado para o usuário a cada requisição feita e que o deslogue caso sua sessão já tenha vencido.
2. Módulo de usuário contendo visualização, criação, edição e exclusão de usuários com hash da senha utilizando bcrypt.
3. Módulo de eventos contendo visualização de eventos, criação, edição e exclusão de eventos. Nesse módulo é importante que haja um endpoint para usuário de role super que retorne dados do evento com seus usuários associados.
4. Módulo de convidados contendo visualização de convidados por evento com possibilidades de filtros, criação de convidados e dependentes para eventos, edição e exclusão de convidados / dependentes. É importante que esse módulo tenha uma funcionalidade de upload de planilhas contendo dados de convidados para fazer carga em banco de dados.
5. Módulo de localidade contendo criação e edição de localidades.  
6. Arquivo docker-compose para criação do banco mysql.
7. Gestão de permissão por endpoint em um Guard do Nest, conforme boas práticas do framework.
8. readme.md estruturado.
9. Pasta contendo documentação de cada módulo do sistema.
