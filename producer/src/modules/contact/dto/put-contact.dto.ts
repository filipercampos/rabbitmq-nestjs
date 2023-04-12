import { PartialType } from '@nestjs/swagger';
import { PostContactDto } from './post-contact.dto';

export class PutContactDto extends PartialType(PostContactDto) {}
