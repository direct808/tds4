import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseEnvDTO } from './database-env.DTO'
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({})
export class DatabaseModule {
  static forRoot(entities: any[], schema: string): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => {
            const env = plainToClass(DatabaseEnvDTO, process.env, {
              strategy: 'excludeAll',
            })
            const errors = validateSync(env)
            if (errors.length) {
              throw new Error(
                errors.map((item) => item.toString(true, true)).join(''),
              )
            }
            return {
              type: 'postgres',
              host: env.DB_HOST,
              port: env.DB_PORT,
              username: env.DB_USER,
              password: env.DB_PASS,
              database: 'postgres',
              entities: entities,
              schema,
              synchronize: true,
              logging: 'all',
              namingStrategy: new SnakeNamingStrategy(),
            }
          },
        }),
      ],
    }
  }
}
