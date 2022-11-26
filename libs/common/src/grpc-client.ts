import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Observable } from 'rxjs'

type TGrpcServiceOptions = {
  url: string
  package: string
  protoPath: string
}

type TObservableService<TProtobufService> = {
  [TKey in keyof TProtobufService]: TProtobufService[TKey] extends (
    request: infer Request,
  ) => Promise<infer Response>
    ? (request: Request) => Observable<Response>
    : never
}

export function makeGrpcService<TContractType>(
  name: string,
  options: TGrpcServiceOptions,
): TObservableService<TContractType> {
  const client = ClientProxyFactory.create({
    transport: Transport.GRPC,
    options: {
      ...options,
      loader: {
        arrays: true,
      },
    },
  })
  return client.getService<TObservableService<TContractType>>(name)
}
