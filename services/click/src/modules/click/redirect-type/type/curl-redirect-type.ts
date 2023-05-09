import { click } from '@tds/contracts/grpc'
import { URL } from 'url'
import { Injectable } from '@nestjs/common'
import { RedirectType } from '../redirect-type'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class CurlRedirectType implements RedirectType {
  constructor(private readonly httpService: HttpService) {}

  async handle(url: string): Promise<click.IAddClickResponse> {
    let { data: content } = await firstValueFrom(
      this.httpService.get<string>(url),
    )

    content = this.setBase(content, this.prepareUrl(url))

    return {
      type: click.AddClickResponse.Type.CONTENT,
      content,
    }
  }

  private setBase(content: string, url: string) {
    return content.replace('<head>', `<head><base href="${url}">`)
  }

  private prepareUrl(url: string) {
    const parsed = new URL(url)

    return `//${parsed.host}/`
  }
}
