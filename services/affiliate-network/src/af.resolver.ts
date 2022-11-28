import { Resolver, ResolveReference } from '@nestjs/graphql'
import { AffiliateNetworkService } from './affiliate-network.service'

@Resolver('AffiliateNetwork')
export class AfResolver {
  constructor(
    private readonly affiliateNetworkService: AffiliateNetworkService,
  ) {}

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    const [[af]] = await this.affiliateNetworkService.find({
      ids: [reference.id],
    })
    return af
  }
}
