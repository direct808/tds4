import { Injectable, OnModuleInit } from '@nestjs/common'
import { Client, ClientGrpc, Transport } from '@nestjs/microservices'
import path from 'path'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class AffiliateNetworkService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4014',
      package: 'tds.affiliate_network',
      protoPath: path.join(
        __dirname,
        '../../../../contracts/grpc/affiliate-network.proto',
      ),
    },
  })
  declare client: ClientGrpc

  private service: any

  onModuleInit() {
    this.service = this.client.getService('AffiliateNetworkService')
  }

  getAffiliateNetworkList(): Promise<any> {
    return firstValueFrom(this.service.getAffiliateNetworkList({}))
  }
}
