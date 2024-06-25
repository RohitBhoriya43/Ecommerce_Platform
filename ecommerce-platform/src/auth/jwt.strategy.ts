// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'yourSecretKey', // Ensure this matches the secret used in JwtModule
    });
  }

  async validate(payload: any) {
    console.log(payload.sub)
    const user = await this.userRepository.findOne({where:{id:payload.sub}});
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id, username: user.username, roles: user.roles };
  }
}