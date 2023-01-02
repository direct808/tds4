import { AddClickDTO } from './dto'
import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { RequestContextHost } from '@nestjs/microservices/context/request-context-host'
import { queryParameterKeys } from './helpers'
import { camelCase } from 'lodash'
import UAParser from 'ua-parser-js'
import { parse } from 'node:querystring'

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
    const { headers } = this.clickData

    return {
      userAgent: this.#findValues(headers, 'user-agent'),
      referer: this.#findValues(headers, 'referer'),
    }
  }

  #findValues(headers: Dict[], name: string): string | undefined {
    return headers.find((dict) => dict.name === name)?.value
  }

  getQueryParameters() {
    const query = parse(this.clickData.query)
    const res: Record<string, string | undefined> = {}
    for (const key of Object.keys(queryParameterKeys)) {
      let val = query[key]
      if (Array.isArray(val)) {
        val = val[val.length - 1]
      }

      if (!val) {
        continue
      }

      res[camelCase(key)] = val
    }

    return res
  }

  getUsrAgentInfo() {
    const userAgent = this.#findValues(this.clickData.headers, 'user-agent')

    if (!userAgent) {
      return {}
    }

    const parser = UAParser(userAgent)

    return {
      os: parser.os.name,
      osVersion: parser.os.version,
      browser: parser.browser.name,
      browserVersion: parser.browser.version,
      deviceModel: parser.device.model,
      deviceType: parser.device.type,
    }
  }
}
