import { PageOptionsDto } from '../dto/page-options.dto';

export type QueryPageOptions<T> = PageOptionsDto & T;

export interface IQueryPage<T> {
  filter: T;
  pageOptions: PageOptionsDto;
}
