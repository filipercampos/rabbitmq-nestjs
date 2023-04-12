import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MongooseConfigFactory implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      dbName: this.configService.get('MONGO_DB_NAME'),
      uri: this.configService.get<string>('MONGO_DB_URI'),
      serverSelectionTimeoutMS: 15000, // Defaults to 30000 (30 seconds)
      useUnifiedTopology: true,
      useNewUrlParser: true,
      retryAttempts: 5,
      ssl: false,
      sslValidate: false,
    };
  }
}

@Injectable()
export class MongooseConfigSslFactory implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const pathSsl = path.join(__dirname, '../../..', 'ca.pem');
    return {
      dbName: this.configService.get('MONGO_DB_NAME'),
      uri: this.configService.get<string>('MONGO_DB_URI'),
      // uri: Configuration.config.mongoUri,
      promiseLibrary: global.Promise,
      ssl: true,
      sslValidate: false,
      sslCert: fs.readFileSync(pathSsl, 'utf-8'),
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
  }
}
