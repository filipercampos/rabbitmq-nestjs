import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseParameter {
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.queryParams = '';
    this.parameters = [];
  }

  private endpoint: string;
  private queryParams = '';
  private parameters = [];

  /**
   * Adiciona o parametro e atualiza a url
   *
   * @param {string} name
   * @param {any} value
   * @param {boolean} validate
   */
  pushParam(name: string, value: any) {
    if (name == null || name === '') {
      throw new Error('Informe o nome do parametro para construção da url');
    }

    if (value != null) {
      let newUrl = '';
      if (this.parameters.length == 0) {
        newUrl += `?${name}=${value}`;
      } else {
        newUrl += `&${name}=${value}`;
      }
      this.parameters.push({
        name: name,
        value: value,
      });
      this.queryParams += newUrl;
    }
  }

  /**
   * Adiciona o parametro e atualiza a url
   * @name {Nome}
   * @value {Valor}
   */
  pushParamArray(name: string, ids: Array<string>) {
    if (ids.length > 0) {
      let idsString = ids[0];
      for (let i = 1; i < ids.length; i++) {
        const id = ids[i];
        idsString = `${idsString},${id}`;
      }
      this.pushParam(name, idsString);
    }
  }

  /**
   * Adiciona um parametro path
   */
  pushPath(value: string | number | boolean) {
    this.queryParams = `/${value}`;
  }

  clear() {
    this.queryParams = '';
    this.parameters = [];
  }

  popPath() {
    this.queryParams = '';
  }

  /**
   * Converter os parametros informados em payload
   */
  toPayload() {
    const payload = {};

    for (let i = 0; i < this.parameters.length; i++) {
      const o = this.parameters[i];
      payload[o.name] = o.value;
    }
    return payload;
  }

  get url(): string {
    return `${this.endpoint}${this.queryParams}`;
  }

  parseMapToJson(map: any) {
    const objects = {};

    map.forEach((value: any, key: any) => {
      const keys = key.split('.'),
        last = keys.pop();
      keys.reduce((r, a) => (r[a] = r[a] || {}), objects)[last] = value;
    });
    return objects;
  }
}
