import {ICrypto} from "../../src/implementation/helpers/crypto";

export class CryptoMock implements ICrypto {
  async hash(data: string): Promise<string> {
    return data.split('').reverse().join('');
  }
  async compare(data: string, hash: string): Promise<boolean> {
    return data.split('').reverse().join('') === hash;
  }
}
