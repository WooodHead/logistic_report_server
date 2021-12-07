import { IsEmail, IsNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';

export class ContactUsDto implements Prisma.ContactUsUncheckedCreateInput {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    message: string;
}
