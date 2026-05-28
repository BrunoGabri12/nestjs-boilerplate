# Descrição
Código boilerplate para aplicações NestJS. Objetivo de aprimorar o meu conhecimento em NestJs 

## O que esta aplicação possui?
Esta aplicação fornece uma base de configuração para qualquer projeto NestJS, incluindo autenticação, autorização, controle de permissões por perfil (role permissions) e demais configurações fundamentais já implementadas.

## Qual o objetivo desta aplicação?
Concentrar o esforço de desenvolvimento nas funcionalidades relevantes ao projeto, eliminando o tempo gasto na implementação de métodos, ferramentas e código repetitivo.

# Estrutura do projeto

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

## Enviroments
No projeto existe um arquivo de enviroment de exemplo. Não utilize-o em ambiente de produção 
Para utilizar as variaveis de ambiente utilize o modulo de config. Ele garante a consistencia dos valores e realiza uma validação prévia das variáveis. Sempre utilize a chamada do configService utilizando getOrThorw
Para adicionar uma nova propriedade do .env, adicione a validação no app.module - utilize a biblioteca JOI 
