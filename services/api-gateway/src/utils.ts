import type { EnvDTO } from '@tds/common/env/env.DTO'
import type { AppEnvDTO } from './modules/config'

export function replaceSubgraphUrls(
  superGraph: string,
  env: EnvDTO & AppEnvDTO,
): string {
  return superGraph
    .replace(
      'AFFILIATE_NETWORK_URL',
      env.SERVICE_AFFILIATE_NETWORK_HOST +
        ':' +
        env.SERVICE_AFFILIATE_NETWORK_PORT,
    )
    .replace(
      'CAMPAIGN_URL',
      env.SERVICE_CAMPAIGN_HOST + ':' + env.SERVICE_CAMPAIGN_PORT,
    )
    .replace('OFFER_URL', env.SERVICE_OFFER_HOST + ':' + env.SERVICE_OFFER_PORT)
    .replace(
      'TRAFFIC_SOURCE_URL',
      env.SERVICE_TRAFFIC_SOURCE_HOST + ':' + env.SERVICE_TRAFFIC_SOURCE_PORT,
    )
}
