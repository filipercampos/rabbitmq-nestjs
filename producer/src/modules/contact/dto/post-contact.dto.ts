import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, Length } from 'class-validator';
export class PostContactDto {
  @Length(3, 45, { message: '$property is invalid' })
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  @IsPhoneNumber('BR')
  phone: string;
}
