import {ICrypto} from "../../implementation/helpers/crypto";
import { hash, compare } from 'bcryptjs'
import { Injectable } from "@nestjs/common";

@Injectable()
export class Crypto implements ICrypto{
    async hash(data: string): Promise<string> {
        return hash(data, 6)
    }

    async compare(data: string, hash: string): Promise<boolean> {
        return await compare(data, hash)
    }
}