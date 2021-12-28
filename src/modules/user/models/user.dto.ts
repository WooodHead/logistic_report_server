import { IsEmail, IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { Prisma } from '@prisma/client';
import { UniqueEmail } from '../../auth/services/uniqueEmail.provider';

export class UserDto implements Prisma.UserUncheckedCreateInput {
    @IsNotEmpty()
    @IsEmail()
    @UniqueEmail({
        message: 'Email already exists',
    })
    email: string;

    @IsNotEmpty()
    password: string;

    name?: string;

    company?: string;
}
