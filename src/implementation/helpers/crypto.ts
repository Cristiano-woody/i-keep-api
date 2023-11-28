export interface ICrypto {
    hash(data: string): Promise<string>
    compare(data: string, hash: string): Promise<boolean>
 }