import { Controller, Get, Param, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { ClickService } from './modules/click'

@Controller()
export class AppController {
  constructor(private readonly clickService: ClickService) {}

  @Get('\\w{6}')
  async addClick(@Req() request: Request) {
    await this.clickService.handleClick(request)
  }

  @Get('gateway/:token')
  async gateway(@Param('token') token: string, @Res() res: Response) {
    this.clickService.handleMeta2Redirect(token, res)
  }
}
