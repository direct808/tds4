import { CampaignStreamInputDTO, StreamOfferInputDTO } from './dto'
import { CampaignStream } from './entities'
import { Any, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { StreamOfferService } from './stream-offer.service'

type SaveManyArgs = {
  campaignId: string
  streams: CampaignStreamInputDTO[]
}

@Injectable()
export class CampaignStreamService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly streamOfferService: StreamOfferService,
  ) {}

  findByCampaignIds(campaignIds: string[]) {
    return this.entityManager.find(CampaignStream, {
      where: { campaignId: Any(campaignIds) },
    })
  }

  async saveMany(
    { campaignId, streams: inputStreams }: Readonly<SaveManyArgs>,
    manager: EntityManager,
  ) {
    const allStreams = await manager.find(CampaignStream, {
      where: {
        campaignId,
      },
    })

    const streamsForDelete = allStreams.filter(
      (stream) => !inputStreams.map((s) => s.id).includes(stream.id),
    )

    if (streamsForDelete.length) {
      await manager.delete(CampaignStream, streamsForDelete)
    }

    this.#checkNotFoundId(inputStreams, allStreams)

    const preparedInputStreams = this.prepareInputStreams(
      campaignId,
      inputStreams,
    )

    const streamsSaved = await manager.save(
      CampaignStream,
      preparedInputStreams,
    )

    await Promise.all(
      streamsSaved.map((savedStream, index) =>
        this.streamOfferService.saveMany({
          streamId: savedStream.id,
          offers: inputStreams[index].offers,
          manager,
        }),
      ),
    )
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

  private prepareInputStreams(
    campaignId: string,
    inputStreams: CampaignStreamInputDTO[],
  ) {
    return inputStreams.map((inputStream) => {
      const { offers, ...stream } = inputStream

      return {
        ...stream,
        campaignId,
      }
    })
  }
}
