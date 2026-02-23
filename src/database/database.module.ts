import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';
import { ConfigService } from '@nestjs/config/dist/config.service';

/*
  Modulo para configuração do banco de dados  
  Atualmente utilizar TypeORM, mas pode ser facilmente adaptado para outro ORM ou driver nativo.
  As configurações sao definidas no typeormConfig, caso seja necessário adicionar suporte a outro banco, 
  basta alterar o DB_TYPE no arquivo .env e garantir que o driver correspondente esteja instalado.

*/
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeormConfig,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
