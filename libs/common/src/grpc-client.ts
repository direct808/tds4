import { ClientProxyFactory, Transport } from '@nestjs/microservices'

type TGrpcServiceOptions = {
  url: string
  package: string
  protoPath: string
}

export function makeGrpcService<T extends object>(
  name: string,
  options: TGrpcServiceOptions,
): T {
  const client = ClientProxyFactory.create({
    transport: Transport.GRPC,
    options: {
      ...options,
      loader: {
        arrays: true,
      },
    },
  })
  return client.getService<T>(name)
}
