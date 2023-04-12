import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PageMetaDto } from '@shared/dto/page-meta.dto';
import { PageDto } from '@shared/dto/page.dto';
import { DateUtil } from '@shared/utils/date.util';
import { PaginationUtil } from '@shared/utils/pagination.util';
import { FilterQuery, Model } from 'mongoose';
import { GetContactDto } from '../dto/get-contact.dto';
import { PostContactDto } from '../dto/post-contact.dto';
import { PutContactDto } from '../dto/put-contact.dto';
import { Contact } from '../schema/contact.schema';

@Injectable()
export class ContactRepository {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  mapper(data: any) {
    const { _id, ...result } = data._doc;
    result.id = _id.toString();
    return result;
  }

  save(body: PostContactDto) {
    const newItem = new this.contactModel(body);
    return newItem.save();
  }

  update(id: string, body: PutContactDto) {
    return this.contactModel.findByIdAndUpdate(id, {
      ...body,
      updatedAt: DateUtil.getDate(),
    });
  }

  async findById(id: string) {
    const result = await this.contactModel.findById(id);
    return result ? this.mapper(result) : null;
  }

  async find(query: FilterQuery<GetContactDto>): Promise<PageDto<Contact>> {
    //remove undefined values
    Object.keys(query).forEach((key) =>
      query[key] === undefined ? delete query[key] : {},
    );
    const { filter, pageOptions } = PaginationUtil.extractPageOptions(query);
    const results = await this.contactModel
      .find(filter)
      .skip(pageOptions.offset)
      .limit(pageOptions.limit)
      .exec();

    const count = await this.contactModel.countDocuments(filter);
    const pageMetaDto = new PageMetaDto({ pageOptions, count });
    return new PageDto(
      results.map((i) => this.mapper(i)),
      pageMetaDto,
    );
  }

  findAll(): Promise<Contact[]> {
    return this.contactModel
      .find()
      .exec()
      .then((result) => result.map((i) => this.mapper(i)));
  }

  async findOne(filter: FilterQuery<Contact>) {
    const result = await this.contactModel.findOne(filter).exec();
    return result ? this.mapper(result) : null;
  }

  remove(id: string) {
    return this.contactModel.findByIdAndDelete(id);
  }
}
