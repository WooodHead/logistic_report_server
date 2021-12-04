import { IsNotEmpty, IsOptional } from 'class-validator';
import { SubscriptionPlans } from '../subscription.service';

export class StripeCallbackQuery {
    @IsNotEmpty()
    stripe_session_id!: string;

    @IsNotEmpty()
    plan!: SubscriptionPlans;

    @IsOptional()
    user_id?: number;
}
