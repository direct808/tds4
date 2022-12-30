import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { Injectable } from '@nestjs/common'
import { EnvDTO } from './env.DTO'

@Injectable()
export class EnvService {
  getEnv() {
    const env = plainToInstance(EnvDTO, process.env, {
      strategy: 'excludeAll',
    })
    const errors = validateSync(env)
    if (errors.length) {
      throw new Error(errors.map((item) => item.toString(true, true)).join(''))
    }

    return env
  }
}
