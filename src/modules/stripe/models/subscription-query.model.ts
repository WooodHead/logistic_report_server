import { IsEnum, IsNotEmpty } from 'class-validator';
import { SubscriptionPlans } from '../subscription.service';

export class SubscriptionQuery {
    @IsNotEmpty()
    @IsEnum(SubscriptionPlans)
    subscription!: SubscriptionPlans;

    user_id?: number;
}
