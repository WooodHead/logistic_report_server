import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async validateUser(email: string, pass: string): Promise<Partial<User> | null> {
        const user: User = await this.userService.findOne({ email });

        if (!user) {
            return null;
        }

        const { password, ...restUser } = user;
        return password === pass ? restUser : null;
    }

    async login(user: User) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...restUser } = user;
        const payload = { id: user.id };
        return {
            user: restUser,
            accessToken: this.jwtService.sign(payload),
        };
    }

    buildJwtAccessToken(userId: number) {
        const payload = { id: userId };
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
        });
    }
}
