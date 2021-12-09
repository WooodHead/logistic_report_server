import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../../user/models/user.model';
import { LoginResponseDto } from '../models/login-response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async validateUser(email: string, pass: string): Promise<UserModel | null> {
        return this.userService.getUserByCredentials(email, pass);
    }

    login(user: UserModel): LoginResponseDto {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const { password, ...restUser } = user;
        const payload = { id: user.id };
        // const a = plainToClass(LoginResponseDto, {
        //     user,
        //     accessToken: this.jwtService.sign(payload),
        // });

        // console.log("-> a", a);
        return {
            user,
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

    async getUserByToken(jwtToken: string): Promise<UserModel | null> {
        try {
            const decodeData: { id: number } = this.jwtService.decode(jwtToken) as { id: number };
            console.log("-> decodeData", decodeData);
            console.log("-> jwtToken", jwtToken);
            return this.userService.findOne({ id: decodeData.id });
        } catch (e) {
            return null;
        }
    }
}
