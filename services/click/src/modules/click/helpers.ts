export const queryParameters = [
  'keyword',
  'cost',
  'currency',
  'externalId',
  'creativeId',
  'adCampaignId',
  'source',
  'subId1',
  'subId2',
  'subId3',
  'subId4',
  'subId5',
  'subId6',
  'subId7',
  'subId8',
  'subId9',
  'subId10',
  'subId11',
  'subId12',
  'subId13',
  'subId14',
  'subId15',
  'extraParam1',
  'extraParam2',
  'extraParam3',
  'extraParam4',
  'extraParam5',
  'extraParam6',
  'extraParam7',
  'extraParam8',
  'extraParam9',
  'extraParam10',
] as const

type Dict = {
  name: string
  value: string
}

export function findValues(headers: Dict[], name: string): string | undefined {
  return headers.find((dict) => dict.name === name)?.value
}
