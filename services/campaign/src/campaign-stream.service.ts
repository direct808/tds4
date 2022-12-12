import { CampaignStreamInputDTO } from './dto'
import { CampaignStream } from './entities'
import { Any, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'

type FindSaveManyArgs = {
  campaignId: string
  streams: CampaignStreamInputDTO[]
}

@Injectable()
export class CampaignStreamService {
  constructor(private readonly entityManager: EntityManager) {}

  findByCampaignIds(campaignIds: string[]) {
    return this.entityManager.find(CampaignStream, {
      where: { campaignId: Any(campaignIds) },
    })
  }

  async saveMany(
    { campaignId, streams }: Readonly<FindSaveManyArgs>,
    manager: EntityManager,
  ) {
    const allStreams = await manager.find(CampaignStream, {
      where: {
        campaignId,
      },
    })

    const streamsForDelete = allStreams.filter(
      (stream) => !streams.map((s) => s.id).includes(stream.id),
    )

    if (streamsForDelete.length) {
      await manager.delete(CampaignStream, streamsForDelete)
    }

    this.#checkNotFoundId(streams, allStreams)

    const entities = streams.map((stream) => ({
      ...stream,
      campaignId,
    }))

    return manager.save(CampaignStream, entities)
  }

  #checkNotFoundId(
    inputStreams: { id?: string }[],
    allStreams: { id: string }[],
  ) {
    const streamsForUpdateIds = inputStreams
      .filter((stream) => stream.id)
      .map((stream) => stream.id!)

    if (!streamsForUpdateIds.length) {
      return
    }
    const idNotFoundStreams = streamsForUpdateIds.filter(
      (id) => !allStreams.map((s) => s.id).includes(id),
    )
    if (idNotFoundStreams.length) {
      throw new Error('id not found')
    }
  }
}
