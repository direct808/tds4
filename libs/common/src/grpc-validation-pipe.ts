import { ValidationError, ValidationPipe } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

export class GrpcValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new RpcException({
          code: 3,
          message: errors.map((e) => e.toString()).join(''),
        })
      },
    })
  }
}
