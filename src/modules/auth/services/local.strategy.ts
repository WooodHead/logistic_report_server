import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            // passwordField: 'pass',
        });
    }

    async validate(email: string, password: string): Promise<Partial<User>> {
        const user: Partial<User> | null = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Incorrect email or password');
        }
        return user;
    }
}
