import { ApiConfig } from '@infra/config/api-config';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Agent } from 'https';
import { lastValueFrom } from 'rxjs';

export abstract class BaseService {
  protected config: ApiConfig;
  private useSsl: boolean;
  private consoleErrorLog: boolean;
  private _logger: Logger = new Logger(BaseService.name);

  constructor(
    config: ApiConfig,
    private httpService: HttpService,
    useSsl = true,
  ) {
    this.config = config;
    this.useSsl = useSsl;
    this.consoleErrorLog = false;
  }

  async get<T>(
    endpoint: string,
    reqConfig: AxiosRequestConfig = { timeout: 20000 },
  ) {
    try {
      this._handleSsl(reqConfig);
      const url = this._buildRoute(endpoint);
      const response = await lastValueFrom(
        this.httpService.get<T>(encodeURI(url), reqConfig),
      );
      return this._getResponseData(response);
    } catch (err) {
      this._handleError(err);
    }
  }

  async post<T>(
    endpoint: string,
    data: any,
    reqConfig: AxiosRequestConfig = { timeout: 20000 },
  ) {
    try {
      this._handleSsl(reqConfig);
      const url = this._buildRoute(endpoint);
      const response = await lastValueFrom(
        this.httpService.post<T>(encodeURI(url), data, reqConfig),
      );
      return this._getResponseData(response);
    } catch (err) {
      this._handleError(err);
    }
  }

  async put<T>(
    endpoint: string,
    id: any,
    data: any,
    reqConfig: AxiosRequestConfig = { timeout: 20000 },
  ) {
    try {
      this._handleSsl(reqConfig);
      let url = this._buildRoute(endpoint);
      if (id != null) {
        url = `${url}/${id}`;
      }
      const response = await lastValueFrom(
        this.httpService.put<T>(encodeURI(url), data, reqConfig),
      );
      return this._getResponseData(response);
    } catch (err) {
      this._handleError(err);
    }
  }

  async patch<T>(
    endpoint: string,
    id: any,
    data: any,
    reqConfig: AxiosRequestConfig = { timeout: 20000 },
  ) {
    try {
      this._handleSsl(reqConfig);
      let url = this._buildRoute(endpoint);
      if (id != null) {
        url = `${url}/${id}`;
      }
      const response = await lastValueFrom(
        this.httpService.patch<T>(encodeURI(url), data, reqConfig),
      );
      return this._getResponseData(response);
    } catch (err) {
      this._handleError(err);
    }
  }

  public disableSsl(ssl = false) {
    this.useSsl = ssl;
  }

  public showConsoleErrorLog(show = false) {
    this.consoleErrorLog = show;
  }

  /**
   * Show logs and disable ssl
   */
  public debug() {
    this.useSsl = false;
    this.consoleErrorLog = true;
  }

  private _getResponseData(result: any) {
    if (result.data.data == undefined) {
      return result.data;
    }
    if (result.data == undefined) {
      return null;
    }
    return result.data.data;
  }

  private _buildRoute(endpoint: string) {
    return `${this.config.baseUrl}/${endpoint}`;
  }

  private _handleError(err: any) {
    let log = '';

    if (err.isAxiosError && err.response) {
      log =
        err.message +
        `\n ${
          typeof err.response.data === 'object'
            ? JSON.stringify(err.response.data)
            : err.response.data
        }`;
    } else {
      log = err.message;
    }
    if (this.consoleErrorLog == true) {
      this._logger.error(log);
    }
    throw err;
  }

  /**
   * Desabilita a validação do SSL
   */
  private _handleSsl(reqConfig: AxiosRequestConfig) {
    if (this.useSsl == false) {
      // At request level
      const agent = new Agent({
        rejectUnauthorized: false,
      });
      reqConfig.httpsAgent = agent;
    }
  }
}
