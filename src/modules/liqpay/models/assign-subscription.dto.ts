import { IsEmail, IsNotEmpty } from 'class-validator';

export class AssignSubscriptionDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    orderId: string;
}
