import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { handlers } from './keitaro-controller.decorator'
import { ModuleRef } from '@nestjs/core'
import { AppController } from '../../app.controller'

type BatchItem = {
  method: 'GET' | 'POST'
  path: ''
  params?: { object: string }
}

type BulkItem = { method: 'GET' | 'POST'; object: string }

@Injectable()
export class KeitaroControllerMiddleware implements NestMiddleware {
  constructor(private readonly moduleRef: ModuleRef) {
    // console.log('KeitaroControllerMiddleware constructor', moduleRef)
  }
  async use(
    req: Request,
    res: Response,
    next: (error?: any) => void,
  ): Promise<any> {
    if (req.method === 'POST') {
      if ('batch' in req.query) {
        const result = await this.batch(req.body)

        return res.send(result)
      }

      if ('bulk' in req.query) {
        const result = await this.bulk(req.body)

        return res.send(result)
      }
    }

    if ('object' in req.query) {
      const object = req.query.object as string
      const handler = this.getHandler(req.method, object)
      if (!handler) {
        console.log(
          `Can not find handler for ${req.method}, ${req.query['object']}`,
        )

        return
      }

      const target = this.moduleRef.get(handler.target.constructor, {
        strict: false,
      })

      const result = handler.handler.call(target, req.body)

      return res.send(result)
    }

    console.log('Request...', req.query)
    next()
  }

  async batch(items: BatchItem[]) {
    const result = []
    for (const item of items) {
      if (!item.params) {
        throw new Error('No params')
      }

      const handler = this.getHandler(item.method, item.params.object)
      if (!handler) {
        console.log(
          `Can not find handler for ${item.method}, ${item.params.object}`,
        )
        continue
      }

      const target = this.moduleRef.get(handler.target.constructor, {
        strict: false,
      })

      result.push(handler.handler.call(target))
    }

    // console.log(result)

    return Promise.all(result).then((result) =>
      result.map((item) => ({
        body: item,
        headers: ['Content-type: application/json; charset=UTF-8'],
        statusCode: 200,
      })),
    )
  }

  async bulk(items: BulkItem[]) {
    const result = []
    for (const item of items) {
      // todo нужно одновременно
      const handler = this.getHandler(item.method, item.object)
      if (!handler) {
        console.log(`Can not find handler for ${item.method}, ${item.object}`)
        continue
      }

      const target = this.moduleRef.get(handler.target.constructor, {
        strict: false,
      })

      result.push(handler.handler.call(target))
    }

    return Promise.all(result).then((result) =>
      result.map((item) => ({
        body: item,
        headers: ['Content-type: application/json; charset=UTF-8'],
        statusCode: 200,
      })),
    )
  }

  getHandler(method: string, name: string) {
    const item = handlers.find(
      (item: any) => item.name === name && item.method === method,
    )
    if (!item) {
      return
    }

    return {
      handler: item.target[item.propertyKey],
      target: item.target,
    }
  }
}
