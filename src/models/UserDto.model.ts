import { IsEmail, IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { CustomCompanyCreateInput } from './Company.model';
import { CustomAutoBrandCreateInput } from './AutoBrand.model';
import { UniqueEmail } from '../modules/auth/services/uniqueEmail.provider';

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
