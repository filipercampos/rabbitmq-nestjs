import { ApiProperty } from '@nestjs/swagger';

export class ResponseMessage {
  @ApiProperty()
  messages: string;
}

export class PostResponseMessage {
  @ApiProperty()
  id: string;
  @ApiProperty()
  message: string;
}
