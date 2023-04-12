import md5 = require('md5');
export class HashMd5Util {
  static gerar(message: string): string {
    return md5(message);
  }
}
