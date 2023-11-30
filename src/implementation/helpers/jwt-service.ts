export interface  IJwtService {
  generateJwt(payload: any): Promise<string>
}