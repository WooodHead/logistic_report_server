import { Prisma, User, Subscription } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserModel implements User {
    id: number;
    email: string;
    name: string | null;
    @Exclude({ toPlainOnly: true })
    password: string;
    created_at: Date;
    updated_at: Date;
    avatar: string | null;
    company: string | null;
    @Exclude({ toPlainOnly: true })
    subscriptions?: Subscription[];

    @Exclude({ toPlainOnly: true })
    get subscription(): Subscription {
        if (!this.subscriptions) {
            return null;
        }
        return this.subscriptions[this.subscriptions.length - 1] || null;
    }

    @Expose()
    get isPro(): boolean {
        return !!(
            this.subscription?.subscriptionEnd && this.subscription?.subscriptionEnd > new Date()
        );
    }

    static connect(user: UserModel): Prisma.UserCreateNestedOneWithoutReportInput {
        if (!user) {
            return {};
        }

        return {
            connect: { id: user.id },
        };
    }
}
