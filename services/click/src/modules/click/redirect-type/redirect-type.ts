import { click } from '@tds/contracts/grpc'

export interface RedirectType {
  handle(url: string): Promise<click.IAddClickResponse>
}
