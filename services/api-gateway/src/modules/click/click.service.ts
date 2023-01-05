import type { Request, Response } from 'express'
import { Injectable } from '@nestjs/common'
import { ForeignService } from '../../foreign.service'
import { grpc } from '@tds/contracts'
import { JwtPayload, verify } from 'jsonwebtoken'
import { EnvDTO } from '@tds/common'

type JwtPayloadUrl = JwtPayload & { url?: string }

@Injectable()
export class ClickService {
  constructor(
    private readonly foreignService: ForeignService,
    private readonly env: EnvDTO,
  ) {}

  public async handleClick(request: Request): Promise<void> {
    const result = await this.foreignService.addClick({
      campaignCode: request.url.substring(1, 7),
      ip: request.ip,
      headers: this.makeKeyValHeaders(request),
      query: request.url.split('?')[1],
    })

    const ret = {
      ...result,
      type: grpc.click.AddClickResponse.Type[result.type!],
    }

    // return res.send(ret)

    if (result.type === undefined || result.type === null) {
      throw new Error('Response type is undefined')
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
      const { url } = verify(token, this.env.SECRET) as JwtPayloadUrl
      res.send(`<html>
<head>
    <meta http-equiv="REFRESH" content="1; URL='${url}'">
    <script type="application/javascript">window.location = "${url}";</script>
</head>
</html>`)
    } catch (e: unknown) {
      return res.sendStatus(400)
    }
  }

  private makeKeyValHeaders(request: Request): grpc.click.KeyVal[] {
    const headers: grpc.click.KeyVal[] = []

    for (let i = 0; i < request.rawHeaders.length; i += 2) {
      headers.push({
        name: request.rawHeaders[i],
        value: request.rawHeaders[i + 1],
      })
    }

    return headers
  }
}
