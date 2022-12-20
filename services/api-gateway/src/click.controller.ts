import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { ForeignService } from './foreign.service'
import { grpc } from '@tds/contracts'

@Controller()
export class ClickController {
  constructor(private readonly foreignService: ForeignService) {}

  @Get('\\w{6}')
  async addClick(@Req() request: Request, @Res() res: Response) {
    const campaignCode = request.url.replace('/', '')

    const result = await this.foreignService.addClick({
      campaignCode,
    })

    const ret = {
      ...result,
      type: grpc.click.AddClickResponse.Type[result.type!],
    }

    // return res.send(ret)

    if (typeof result.type === 'undefined') {
      throw new Error('Response type undefined')
    }

    switch (result.type) {
      case grpc.click.AddClickResponse.Type.CONTENT:
        return res.send(result.content)
      case grpc.click.AddClickResponse.Type.NOTHING:
        return res.send('')
      case grpc.click.AddClickResponse.Type.NOT_FOUND:
        return res.sendStatus(404)
      case grpc.click.AddClickResponse.Type.REDIRECT:
        return res.redirect(result.redirectUrl!)
      default:
        const type: never = result.type
        throw new Error('Unknown response type ' + type)
    }
  }
}
