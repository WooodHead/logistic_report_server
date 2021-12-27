import { Injectable, Logger } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import * as LiqPay from './utils/liqpay';
import { SubscriptionPlans, SubscriptionService } from './subscription.service';
import { LiqpaySubscriptionInterface } from './models/liqpay-subscription.interface';
import * as moment from 'moment';

@Injectable()
export class LiqPayService {
    // private axiosConfig: AxiosRequestConfig;
    private readonly liqPay;

    private readonly logger = new Logger('LiqPayModule');

    constructor(
        @InjectStripe() private readonly stripeClient: Stripe,
        private configService: ConfigService,
        private readonly subscriptionService: SubscriptionService
    ) {
        const liqPayPublicKey = this.configService.get('LIQPAY_PUBLIC_KEY');
        const liqPayPrivateKey = this.configService.get('LIQPAY_PRIVATE_KEY');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.liqPay = new LiqPay(liqPayPublicKey, liqPayPrivateKey);
    }

    async checkoutData(plan: SubscriptionPlans, lng: string, userId?: number) {
        // ToDo reformat it
        let amount = 5;
        if (plan === SubscriptionPlans.YEAR) {
            amount = 48;
        }

        const orderId = Date.now();
        const successUrl = `${
            this.configService.get('FRONTEND_URL') as string
        }auth/register?orderId=${orderId}`;
        const info = JSON.stringify({ plan, userId });
        // console.log("-> info", JSON.parse(info));
        const webHookUrl = `${this.configService.get('SERVER_API_URL') as string}liqpay/webhook`;

        const obj = this.liqPay.cnb_object({
            action: 'subscribe',
            subscribe: '1',
            subscribe_periodicity: plan,
            subscribe_date_start: Date.now(),
            amount,
            language: lng,
            currency: 'USD',
            description: 'Logistic Report Subscription',
            order_id: orderId,
            // paytypes: 'gpay',
            info,
            version: '3',
            server_url: webHookUrl,
            result_url: successUrl,
        });

        return {
            ...obj,
            url: 'https://www.liqpay.ua/api/3/checkout',
        };
    }

    async createSubscription(
        subscription: LiqpaySubscriptionInterface,
        plan: SubscriptionPlans,
        userId: number
    ) {
        const format = 'YYYY-MM-DD HH:mm:ss';
        const startDate = moment(subscription.create_date);
        const unit = plan === SubscriptionPlans.YEAR ? 'year' : 'month';
        const endDate = moment(subscription.create_date).add(1, unit);
        return this.subscriptionService.store({
            uniqId: '' + subscription.payment_id,
            orderId: '' + subscription.order_id,
            subscriptionStart: startDate.toDate(),
            subscriptionEnd: endDate.toDate(),
            plan,
            ...(userId && { userId }),
        });
    }
}
