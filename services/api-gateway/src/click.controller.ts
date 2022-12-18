import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { ForeignService } from './foreign.service'

@Controller()
export class ClickController {
  constructor(private readonly foreignService: ForeignService) {}

  @Get('\\w{6}')
  async addClick(@Req() request: Request, @Res() res: Response) {
    const campaignCode = request.url.replace('/', '')

    const result = await this.foreignService.addClick({
      campaignCode: '',
    })

    console.log(result)

    const ret = {
      result: 'ok111111',
      code: campaignCode,
    }

    res.send(ret)
    // res.redirect('https://ya.ru')
  }
}
