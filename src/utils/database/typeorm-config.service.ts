import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  /**
   * 
   * @returns database connection options
   */
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      url: this.configService.get<string>('DB_URI'),
      port: parseInt('5432'),
      synchronize: true,
      dropSchema: false,
      keepConnectionAlive: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
      factories: [__dirname + '/factories/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
      },
      extra: {
        // based on https://node-postgres.com/api/pool
        // max connection pool size
        max: true,
      },
    } as TypeOrmModuleOptions;
  }
}