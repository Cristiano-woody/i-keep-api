import {IJwtHelper} from "../../implementation/helpers/jwt-helper";
import {Injectable} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHelper implements IJwtHelper{
    constructor(private jwtService: JwtService){}
    generateJwt(payload: any): Promise<string> {
        return this.jwtService.signAsync(payload)
    }
}