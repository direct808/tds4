import { Module } from '@nestjs/common'
import { EnvService } from '@tds/common/env/env.service'
import { EnvDTO } from '@tds/common/env/env.DTO'

@Module({
  providers: [
    EnvService,
    {
      provide: EnvDTO,
      useFactory(envService: EnvService) {
        return envService.getEnv()
      },
      inject: [EnvService],
    },
  ],
  exports: [EnvDTO],
})
export class EnvModule {}
