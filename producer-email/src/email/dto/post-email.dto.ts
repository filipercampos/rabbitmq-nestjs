import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
export class PostEmailDto {
  @ApiProperty({ required: true })
  @IsEmail({ message: 'Invalid email' })
  email: string;
}
