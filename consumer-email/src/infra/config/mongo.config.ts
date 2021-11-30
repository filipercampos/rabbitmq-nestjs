import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { Configuration } from './configuration';

@Injectable()
export class MongooseConfigFactory implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: Configuration.config.mongoUri,
      connectionName: 'mongo',
      dbName: 'mongo',
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
  createMongooseOptions(): MongooseModuleOptions {
    const pathSsl = path.join(__dirname, '../../..', 'ca.pem');
    return {
      dbName: 'db-name',
      uri: Configuration.config.mongoUri,
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
