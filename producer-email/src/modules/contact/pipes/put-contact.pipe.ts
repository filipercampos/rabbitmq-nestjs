import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  NotFoundException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import { PutContactDto } from '../dto/put-contact.dto';
import { ContactRepository } from '../repositories/contact.repository';

export class PutContactPipe implements PipeTransform<PutContactDto> {
  constructor(
    @Inject(REQUEST)
    private request: Request,
    private repository: ContactRepository,
  ) {}
  async transform(value: PutContactDto, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    const contact = await this.repository.findById(this.request.params['id']);
    if (!contact) throw new NotFoundException(`Contact not found`);

    //validate new phone
    const phone = await this.repository.findOne({ phone: value.phone });
    //if phone belong someone
    if (phone && contact && phone.id !== contact.id) {
      throw new UnprocessableEntityException(
        `Phone ${value.phone} belong another contact`,
      );
    }
    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
