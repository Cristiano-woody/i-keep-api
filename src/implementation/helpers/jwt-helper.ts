export interface  IJwtHelper {
  generateJwt(payload: any): Promise<string>
}