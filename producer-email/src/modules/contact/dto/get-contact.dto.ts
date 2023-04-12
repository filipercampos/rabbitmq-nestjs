import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from '@shared/dto/page-options.dto';
import { IsOptional } from 'class-validator';

export class GetContactDto extends PageOptionsDto {
  @IsOptional()
  @ApiProperty({ required: false })
  plate: string;

  @IsOptional()
  @ApiProperty({ required: false })
  status: number;
}
