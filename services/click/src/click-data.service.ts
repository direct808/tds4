import { AddClickDTO } from './dto'
import { Injectable } from '@nestjs/common'

type Dict = {
  name: string
  value: string
}

@Injectable()
export class ClickDataService {
  get({ headers, query }: AddClickDTO) {
    return {
      userAgent: this.#findValues(headers, 'user-agent'),
      referer: this.#findValues(headers, 'referer'),
      source: this.#findValues(query, 'source'),
      keyword: this.#findValues(query, 'keyword'),
    }
  }

  #findValues(headers: Dict[], name: string): string | undefined {
    return headers.find((dict) => dict.name === name)?.value
  }
}
