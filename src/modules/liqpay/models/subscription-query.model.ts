import { IsEnum, IsNotEmpty } from 'class-validator';
import { SubscriptionPlans } from '../subscription.service';

export class SubscriptionQuery {
    @IsNotEmpty()
    @IsEnum(SubscriptionPlans)
    subscription!: SubscriptionPlans;

    // @IsNotEmpty()
    language!: 'en' | 'uk' | 'ru';

    user_id?: number;
}
