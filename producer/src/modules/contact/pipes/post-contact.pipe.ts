import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import { PostContactDto } from '../dto/post-contact.dto';
import { ContactRepository } from '../repositories/contact.repository';

export class PostContactPipe implements PipeTransform<PostContactDto> {
  constructor(
    @Inject(REQUEST)
    private request: Request,
    private repository: ContactRepository,
  ) {}
  async transform(value: PostContactDto, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    const contact = await this.repository.findOne({ phone: value.phone });
    if (contact)
      throw new UnprocessableEntityException(
        `Phone ${value.phone} already exists`,
      );
    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
