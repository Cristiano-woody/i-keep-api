/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/UserEntity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import UserAlreadyExistError from 'src/errors/UserAlreadyExistError';
import InvalidCredentialsError from 'src/errors/InvalidCredentialsError';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const allUsers = await this.userRepository.find({relations:['notes']});
    return allUsers;
  }

  async create(userData: { name: string; password: string; email: string }) {
    const userAlreadyExists = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (userAlreadyExists) {
      throw new UserAlreadyExistError();
    }
    const user = new User();
    user.name = userData.name;
    user.email = userData.email;
    user.password_hash = await hash(userData.password, 6);
    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }

  async login(loginData: { email: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: { email: loginData.email },
    });
    if (!user) {
      throw new InvalidCredentialsError('Email or Password incorrect.');
    }
    const passwordMettings = await compare(loginData.password, user.password_hash);
    if (!passwordMettings) {
      throw new InvalidCredentialsError('Email or Password incorrect.');
    }
  }

  async findOneByEmail(email:string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user
  }

  async findOnebyID(id:string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['notes']
    }).catch(err => {
      console.log('cheguei')
      throw new BadRequestException('User not found')
    })
    if(user.id != id ) {
    }
    return user
  }
}
