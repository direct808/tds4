import { IsString, Length } from 'class-validator'
import { click } from '@tds/contracts'

export class AddClickDTO
  implements Record<keyof click.AddClickRequest, unknown>
{
  @IsString()
  @Length(6, 6)
  campaignCode!: string
}
