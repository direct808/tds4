import { AddClickDTO } from './dto'
import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { RequestContextHost } from '@nestjs/microservices/context/request-context-host'

type Dict = {
  name: string
  value: string
}

@Injectable()
export class ClickDataService {
  constructor(
    private readonly clickData: AddClickDTO,
    @Inject(REQUEST) private readonly request: RequestContextHost<AddClickDTO>,
  ) {}

  get() {
    const { headers, query } = this.clickData

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
