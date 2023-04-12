import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@shared/responses/response-message';
import { PostEmailDto } from './dto/post-email.dto';
import { EmailService } from './email.service';

@ApiTags('emails')
@Controller('emails')
export class EmailController {
  constructor(private readonly service: EmailService) {}

  @ApiResponse({
    type: ResponseMessage,
    status: HttpStatus.CREATED,
    description: 'Email sent',
  })
  @ApiOperation({
    summary: 'Emails',
    description: 'Send message to queue',
  })
  @Post()
  sendEmail(@Body() body: PostEmailDto) {
    return this.service.sendEmail(body);
  }
}
