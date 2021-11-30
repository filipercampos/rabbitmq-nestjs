import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schema/log.schema';

/**
 * Log Service persistence MongoDB
 */
@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  private readonly logger = new Logger(LogService.name);
  async saveLog(log: Log): Promise<LogDocument> {
    try {
      this.logger.log(`postLog`);
      const logCriado = new this.logModel(log);
      return await logCriado.save();
    } catch (error) {
      throw this._handleError(error, 'saveLog');
    }
  }

  async findById(_id: string): Promise<Log> {
    try {
      return await this.logModel.findById(_id).exec();
    } catch (error) {
      throw this._handleError(error, 'getById');
    }
  }

  /**
   * Get logs
   * @param params
   * @returns {Array<Log>}
   */
  async find(params: {
    key?: string;
    startDate?: Date;
    endDate?: Date;
    pagination?: {
      page: number;
      limit: number;
      skip: number;
    };
  }): Promise<Log[]> {
    try {
      this.logger.log(`find`);
      const query: any = {};
      if (params.startDate) {
        if (!params.startDate) {
          params.endDate = new Date();
        }
        //filter date range
        query.createdAt = {
          $gte: params.startDate,
          $lte: params.endDate,
        };
      }

      if (query.key) {
        query.key = query.key;
      }
      this.logger.log('find');

      //pagination
      if (query.pagination) {
        const pagination = params.pagination;
        const skip = pagination.limit * (pagination.page - 1);
        return await this.logModel
          .find(query)
          .skip(skip)
          .limit(pagination.limit)
          .sort({ createdAt: 'desc' })
          .exec();
      }

      return await this.logModel.find(query).exec();
    } catch (error) {
      throw this._handleError(error, 'clearLogs');
    }
  }

  /**
   * Drop collection
   */
  async clearLogs() {
    try {
      this.logger.error(`clearLogs`);
      await this.logModel.collection.drop();
    } catch (error) {
      throw this._handleError(error, 'clearLogs');
    }
  }
  /**
   *  Handle error
   */
  private _handleError(error: any, method?: string) {
    this.logger.error(`${method || ''}: ${error.message}`);
    return new InternalServerErrorException('Ocorreu um erro inesperado');
  }
}
