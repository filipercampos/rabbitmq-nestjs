import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PostContactPayload } from './interfaces/post-contact.payload';
import { Contact } from './schema/contact.schema';
import { DateUtil } from '@shared/utils';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private model: Model<Contact>) {}

  mapper(data: any) {
    const { _id, ...result } = data._doc;
    result.id = _id;
    return result;
  }

  save(body: PostContactPayload) {
    const newItem = new this.model(body);
    newItem.createdAt = DateUtil.getDate();
    return newItem.save();
  }

  update(id: string, body: Partial<Contact>) {
    return this.model.findByIdAndUpdate(id, {
      ...body,
      updatedAt: DateUtil.getDate(),
    });
  }
  async find(query: FilterQuery<Contact>): Promise<Contact[]> {
    //remove undefined values
    Object.keys(query).forEach((key) =>
      query[key] === undefined ? delete query[key] : {},
    );
    const results = await this.model.find(query).exec();
    return results.map((i) => this.mapper(i));
  }

  async findOne(filter: FilterQuery<Contact>) {
    const result = await this.model.findOne(filter).exec();
    return result ? this.mapper(result) : null;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
