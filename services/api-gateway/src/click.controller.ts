import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { ForeignService } from './foreign.service'
import { click } from '@tds/contracts'

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
      type: click.AddClickResponse.Type[result.type!],
    }

    res.send(ret)
    // res.redirect('https://ya.ru')
  }
}
