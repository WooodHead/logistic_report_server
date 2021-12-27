import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Prisma, Subscription as SubscriptionEntity } from '@prisma/client';
import { PrismaService } from '../../services/prisma.service';
import { UserModel } from '../user/models/user.model';
import { plainToClass } from 'class-transformer';
import { Subscription } from './models/subscription.model';

export enum SubscriptionPlans {
    YEAR = 'year',
    MONTH = 'month',
}

@Injectable()
export class SubscriptionService {
    constructor(private prisma: PrismaService) {}

  // findOne(subscriptionData: FindConditions<Subscription>): Promise<Subscription | undefined> {
    // return this.manager.findOne(Subscription, subscriptionData);
  // }

    async store(data: Prisma.SubscriptionUncheckedCreateInput): Promise<SubscriptionEntity> {
        return this.prisma.subscription.create({ data });
    }

    async update(params: {
        where: Prisma.SubscriptionWhereUniqueInput;
        data: Prisma.SubscriptionUncheckedUpdateInput;
    }): Promise<Subscription> {
        const { where, data } = params;
        console.log("-> data", data);
        console.log("-> where", where);
        const subscriptionEntity = await this.prisma.subscription.update(params);
        // ToDo checkUpdresult
        return subscriptionEntity ? plainToClass(Subscription, subscriptionEntity) : null;
    }

  // async store(userId: number, plan: SubscriptionPlans, subscription: Stripe.Subscription): Promise<Subscription> {
    // const subscriptionEntity = this.manager.create(Subscription, {
    //   user_id: userId,
    //   subscription_id: subscription.id,
    //   subscription_start: new Date(subscription.current_period_start * 1000),
    //   subscription_end: new Date(subscription.current_period_end * 1000),
    //   trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
    //   trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
    //   plan
    // });
    // return this.manager.save(subscriptionEntity);
  // }

  // async storeUnlimited(userId: number): Promise<Subscription> {
    // // ToDo fix it we accepted flat fee mode
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = today.getMonth();
    // const day = today.getDate();
    //
    // const subscriptionEntity = this.manager.create(Subscription, {
    //   user_id: userId,
    //   subscription_start: new Date(),
    //   subscription_end: new Date(year + 100, month, day)
    // });
    // return this.manager.save(subscriptionEntity);
  // }

  // getSubscriptionByStripeId(subscriptionStripeId: string): Promise<Subscription | undefined> {
  //   return this.findOne({ subscription_id: subscriptionStripeId }); // ToDo where!
  // }

  // async updateById(id: number, subscription: Stripe.Subscription): Promise<UpdateResult> {
  //   return this.manager.update(Subscription, id, {
  //     subscription_start: new Date(subscription.current_period_start * 1000),
  //     subscription_end: new Date(subscription.current_period_end * 1000),
  //     trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
  //     trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null
  //   });
  // }

  // async updateByStripeId(stripeId: string, subscription: Stripe.Subscription): Promise<UpdateResult> {
  //   return this.manager.update(Subscription, {
  //     where: { subscription_id: stripeId }
  //   }, {
  //     subscription_start: new Date(subscription.current_period_start * 1000),
  //     subscription_end: new Date(subscription.current_period_end * 1000),
  //     trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
  //     trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null
  //   });
  // }
}
