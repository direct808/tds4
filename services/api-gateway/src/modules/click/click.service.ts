import type { Request, Response } from 'express'
import { Injectable } from '@nestjs/common'
import { ForeignService } from '../../foreign.service'
import { grpc } from '@tds/contracts'
import { JwtPayload, verify } from 'jsonwebtoken'
import { EnvDTO } from '@tds/common'

@Injectable()
export class ClickService {
  constructor(
    private readonly foreignService: ForeignService,
    private readonly env: EnvDTO,
  ) {}

  public async handleClick(request: Request): Promise<void> {
    const campaignCode = request.url.replace('/', '')

    const headers: grpc.click.Header[] = []

    for (let i = 0; i < request.rawHeaders.length; i += 2) {
      headers.push({
        name: request.rawHeaders[i].toLowerCase(),
        value: request.rawHeaders[i + 1],
      })
    }

    const result = await this.foreignService.addClick({
      campaignCode,
      ip: request.ip,
      headers,
    })

    const ret = {
      ...result,
      type: grpc.click.AddClickResponse.Type[result.type!],
    }

    // return res.send(ret)

    if (result.type === undefined || result.type === null) {
      throw new Error('Response type undefined')
    }

    const res = request.res!

    switch (result.type) {
      case grpc.click.AddClickResponse.Type.CONTENT:
        res.send(result.content)
        break
      case grpc.click.AddClickResponse.Type.NOTHING:
        res.send('')
        break
      case grpc.click.AddClickResponse.Type.NOT_FOUND:
        res.sendStatus(404)
        break
      case grpc.click.AddClickResponse.Type.REDIRECT:
        res.redirect(result.redirectUrl!)
        break
      default:
        const type: never = result.type
        throw new Error('Unknown response type ' + type)
    }
  }

  handleMeta2Redirect(token: string, res: Response) {
    try {
      const { url } = verify(token, this.env.SECRET) as JwtPayload
      res.send(`<html>
<head>
    <meta http-equiv="REFRESH" content="1; URL='${url}'">
    <script type="application/javascript">window.location = "${url}";</script>
</head>
</html>`)
    } catch (e) {
      return res.sendStatus(400)
    }
  }
}
