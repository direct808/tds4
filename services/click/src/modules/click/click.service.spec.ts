import { Test } from '@nestjs/testing'
import { ClickService } from './click.service'
import { ForeignService } from './foreign.service'
import { grpc } from '@tds/contracts'
import { ActionTypeModule } from './action-type'
import { RedirectTypeFactory } from './redirect-type'
import { CurlRedirectType } from './redirect-type/type'
import { campaign } from '@tds/contracts/grpc'

describe('click.service', () => {
  it('Without campaign must return not found', async () => {
    const module = await createModule({})
    const clickService = module.get(ClickService)

    const res = await clickService.add({
      ip: '192.183.33.33',
      campaignCode: 'test',
      headers: [],
      query: '',
    })
    expect(res.type).toEqual(grpc.click.AddClickResponse.Type.NOT_FOUND)
  })
})

function createModule(data: campaign.IGetCampaignFullResponse) {
  return Test.createTestingModule({
    providers: [ClickService, RedirectTypeFactory, CurlRedirectType],
    imports: [ActionTypeModule],
  })
    .useMocker((token) => {
      switch (token) {
        case ForeignService:
          return {
            getCampaignFull(): ReturnType<ForeignService['getCampaignFull']> {
              return Promise.resolve(data)
            },
          }
        default:
          return {}
      }
    })
    .compile()
}
