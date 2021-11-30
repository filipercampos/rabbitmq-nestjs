import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/shared/models/response-message.entity';
import { PostEmailDto } from './dto/post-email.dto';
import { EmailService } from './email.service';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiResponse({
    type: ResponseMessage,
    status: HttpStatus.CREATED,
    description: 'Email sent',
  })
  @Post()
  async sendEmail(@Body() body: PostEmailDto) {
    return await this.emailService.sendEmail(body);
  }
}
