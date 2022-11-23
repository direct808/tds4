import { EnvDto } from './env.dto'
import { validateSync } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { Injectable } from '@nestjs/common'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import dotenv from 'dotenv'
import { TrafficSource } from '../entities/traffic-source.entity'

@Injectable()
export class ConfigService {
  private readonly env: EnvDto

  constructor() {
    dotenv.config({ path: '.env' })
    this.env = plainToClass(EnvDto, process.env, { strategy: 'excludeAll' })
    const errors = validateSync(this.env)
    if (errors.length) {
      throw new Error(errors.map((item) => item.toString(true, true)).join(''))
    }
  }

  dbConfig(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      username: this.env.DB_USER,
      password: this.env.DB_PASS,
      database: 'postgres',
      entities: [TrafficSource],
      schema: 'traffic_source',
      synchronize: true,
      logging: 'all',
    }
  }
}
