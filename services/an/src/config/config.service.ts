import { EnvDto } from './env.dto';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import path from 'path';
import dotenv from 'dotenv';
import { AffiliateNetwork } from '../entities/affiliate-network.entity';

@Injectable()
export class ConfigService {
  private readonly env: EnvDto;

  constructor() {
    dotenv.config({ path: '.env' });
    this.env = plainToClass(EnvDto, process.env, { strategy: 'excludeAll' });
    const errors = validateSync(this.env);
    if (errors.length) {
      throw new Error(errors.map((item) => item.toString(true, true)).join(''));
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
      entities: [AffiliateNetwork],
      schema: 'affiliate_network',
      synchronize: true,
      logging: 'all',
    };
  }
}
