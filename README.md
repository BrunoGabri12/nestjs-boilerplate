# Descrição

Código boilerplate para aplicações NestJS.

## O que esta aplicação possui?

Esta aplicação fornece uma base de configuração para qualquer projeto NestJS, incluindo autenticação, autorização, controle de permissões por perfil (role permissions) e demais configurações fundamentais já implementadas.

## Qual o objetivo desta aplicação?

Concentrar o esforço de desenvolvimento nas funcionalidades relevantes ao projeto, eliminando o tempo gasto na implementação de métodos, ferramentas e código repetitivo.

# Estrutura do projeto

O projeto segue a estrutura modular recomendada pelo NestJS. Internamente, cada módulo organiza suas responsabilidades em diretórios separados.
> Exemplo: `service` → `services`

# Pacotes necessários

Antes de utilizar este boilerplate, certifique-se de que os seguintes pacotes estejam instalados:

```bash
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
npm install --save @nestjs/jwt
npm install @nestjs/config
npm install @nestjs/config class-transformer class-validator
npm i nestjs-joi
npm install pg
```

## Utilizando TypeORM

```bash
npm install --save typeorm mysql2
npm install --save @nestjs/typeorm
```

## Variáveis de ambiente

Defina as variaveis no arquivo de .env

A função de `app.config.ts` valida o arquivo de env, garantindo consistencia.

```bash
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=senha
DB_DATABASE=nome_do_banco
```

## Docker compose

No projeto há o arquivo de docker-compose.yml. Para inicializar o banco de dados, basta utilizar o seguinte comando `docker-compose up -d`


### Docker compose - Erro de inicialização 
Caso, ao tentar realizar login a autenticação de senha estiver falhando, atente-se a eliminar o processo do postgres. Esse tipo de exceção pode acontecer caso esteja possua o postgres instalado e esteja rodando o docker com uma imagem do postgres 
