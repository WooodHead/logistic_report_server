import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User as UserEntity } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '../../user/models/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            // passwordField: 'pass',
        });
    }

    async validate(email: string, password: string): Promise<UserModel> {
        const user: UserModel | null = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Incorrect email or password');
        }
        return user;
    }
}
