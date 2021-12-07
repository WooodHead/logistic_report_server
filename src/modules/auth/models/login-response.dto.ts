import { Type } from 'class-transformer';
import { UserModel } from '../../user/models/user.model';

export class LoginResponseDto {
    @Type(() => UserModel)
    user!: UserModel;

    accessToken!: string;
}
