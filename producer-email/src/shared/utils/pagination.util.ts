import { PageOptionsDto } from '../dto/page-options.dto';
import { QueryPageOptions } from '../interfaces/query-page.dto';

export class PaginationUtil {
  /**
   * Extract page options and query
   *
   * @param query Query filter and page options
   *
   * See {@link AbstractQueryPage}
   */
  static extractPageOptions(
    query: any & PageOptionsDto,
  ): QueryPageOptions<any> {
    const { page, limit, ...filter } = query;
    const pageOptions = {
      page: page,
      limit: limit,
      offset: query.offset,
    };
    return { pageOptions, filter: filter ?? {} };
  }
}
