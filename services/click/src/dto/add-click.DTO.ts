import { IsNotEmpty, IsString } from 'class-validator'
import { click } from '@tds/contracts'

export class AddClickDTO
  implements Record<keyof click.IAddClickRequest, unknown>
{
  @IsString()
  @IsNotEmpty()
  name!: string
}
