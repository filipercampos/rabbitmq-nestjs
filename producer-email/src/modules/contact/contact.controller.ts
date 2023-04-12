import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@shared/responses/response-message';

import { ContactService } from './contact.service';
import { GetContactDto } from './dto/get-contact.dto';
import { PostContactDto } from './dto/post-contact.dto';
import { PutContactDto } from './dto/put-contact.dto';
import { PostContactPipe } from './pipes/post-contact.pipe';
import { PutContactPipe } from './pipes/put-contact.pipe';
import { ContactEntity } from './responses/contact.response';

@ApiTags('contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @ApiResponse({
    type: ResponseMessage,
    status: HttpStatus.CREATED,
    description: 'Contact save',
  })
  @ApiOperation({
    summary: 'Contacts',
    description: 'Save contact',
  })
  @Post()
  postContact(@Body(PostContactPipe) body: PostContactDto) {
    return this.service.save(body);
  }

  @ApiResponse({ type: ContactEntity, isArray: true, status: HttpStatus.OK })
  @ApiOperation({
    summary: 'Contacts',
    description: 'Save contact',
  })
  @Get()
  find(@Query() query: GetContactDto) {
    return this.service.find(query);
  }

  @ApiResponse({ type: ContactEntity, status: HttpStatus.OK })
  @ApiOperation({
    summary: 'Contacts',
    description: 'Get contact by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @ApiResponse({ type: ResponseMessage, status: HttpStatus.OK })
  @ApiOperation({
    summary: 'Contacts',
    description: 'Update contact',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body(PutContactPipe) body: PutContactDto) {
    return this.service.update(id, body);
  }

  @ApiResponse({ type: ResponseMessage, status: HttpStatus.OK })
  @ApiOperation({
    summary: 'Contacts',
    description: 'Remove contact',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
