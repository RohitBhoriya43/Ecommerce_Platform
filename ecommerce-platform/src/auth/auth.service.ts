// auth.service.ts
import { Injectable,HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { LoginDto } from './login.dto';
import { ClientSideException } from 'src/comman/exceptions/role-exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, roles: string[]): Promise<{user:User,accessToken:string} | null> {
    let userObj = await this.findUser(username)
    if (!userObj){
      const hashedPassword = await bcrypt.hash(password, 10);
      let user = this.userRepository.create({ username, password: hashedPassword, roles });
      await this.userRepository.save(user);
      let userData = await this.findUser(username)
      return {
        user:userData,
        accessToken:this.jwtService.sign({ username: userData.username, sub: userData.id, roles: userData.roles })
      }
    }
    throw new ClientSideException("User is already exists",HttpStatus.BAD_REQUEST) 
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<{ user: User, accessToken: string }> {
    const user = await this.validateUser(loginDto.username,loginDto.password)
    if (user){
      const payload = { username: user.username, sub: user.id, roles: user.roles };
      
      return {
        user,
        accessToken: this.jwtService.sign(payload),
      };
    }
    throw new ClientSideException("Invalid credentials",HttpStatus.BAD_REQUEST)
  }

  async findUser(username:string):Promise<User| null>{
    return  await this.userRepository.findOne({ where: { username } });
  }
}
