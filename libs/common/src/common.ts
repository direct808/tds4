import { join } from 'path'
import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer'
import { validateSync } from 'class-validator'
import * as process from 'process'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions'
import { DBEnvDTO } from './db-env.DTO'

export const contractsPath = join(__dirname, '../../../../contracts')

export function unique<T = unknown>(input: T[]) {
  return [...new Set(input)]
}

export function convertEnum<
  A extends object,
  AValue extends A[keyof A],
  B extends Record<keyof A, BValue>,
  BValue extends B[keyof B],
>(a: A, b: B, aValue: AValue | null): B[keyof B] | null {
  if (aValue === undefined || aValue === null) {
    return null
  }

  let key: keyof A | null = null

  for (const i in a) {
    if (a[i] === aValue) {
      key = i
      break
    }
  }

  if (!key) {
    throw new Error('No key')
  }

  return b[key]
}

export const getEnvConfig = <T extends object>(
  classDTO: ClassConstructor<T>,
) => {
  const config = plainToInstance(classDTO, process.env, {
    strategy: 'exposeAll',
  })

  const errors = validateSync(config)

  if (errors.length) {
    console.error('Env validation error: ' + errors, 'ConfigService')

    process.exit(1)
  }

  return instanceToPlain(config, { strategy: 'excludeAll' }) as T
}

type DefaultDatabaseConfigOptions = {
  dbEnv: DBEnvDTO
  schema: string
  entities: BaseDataSourceOptions['entities']
}

export function defaultDatabaseConfig({
  entities,
  schema,
  dbEnv,
}: DefaultDatabaseConfigOptions): PostgresConnectionOptions {
  return {
    type: 'postgres',
    host: dbEnv.DB_HOST,
    port: dbEnv.DB_PORT,
    username: dbEnv.DB_USER,
    password: dbEnv.DB_PASS,
    database: 'postgres',
    entities,
    schema,
    synchronize: true,
    logging: 'all',
    namingStrategy: new SnakeNamingStrategy(),
  }
}
