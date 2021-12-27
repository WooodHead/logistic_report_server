import { Expose, Transform } from 'class-transformer';
import { SubscriptionPlans } from '../subscription.service';
import { Subscription as SubscriptionEntity } from '@prisma/client';

// @Unique(['subscription_id'])
export class Subscription implements SubscriptionEntity {
    id: number;

    @Transform(Subscription._dateFormat.bind(this))
    subscriptionStart: Date;

    @Transform(Subscription._dateFormat.bind(this))
    subscriptionEnd: Date;

    @Transform(Subscription._dateFormat.bind(this))
    trialStart: Date | null;

    @Transform(Subscription._dateFormat.bind(this))
    trialEnd: Date | null;

    uniqId: string;

    orderId: string;

    plan: SubscriptionPlans;

    // user!: User;

    userId!: number;

    @Expose()
    get isKillaFriend(): boolean {
        return !!this.subscriptionEnd && this.subscriptionEnd > new Date();
    }

    static _dateFormat({ value: date }: { value: Date | null }) {
        return date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : '';
    }
}
