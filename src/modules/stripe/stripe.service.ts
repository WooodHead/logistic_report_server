import {
    BadGatewayException,
    BadRequestException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { SubscriptionPlans, SubscriptionService } from './subscription.service';
import { UserDto } from '../user/models/user.dto';

export enum StripeEvents {
    SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
    SUBSCRIPTION_CREATED = 'customer.subscription.created',
    SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
    CHECKOUT_COMPLETED = 'checkout.session.completed',
}

@Injectable()
export class StripeService {
    private axiosConfig: AxiosRequestConfig;

    private readonly logger = new Logger('StripeModule');

    constructor(
        @InjectStripe() private readonly stripeClient: Stripe,
        private configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly userService: UserService,
        private readonly subscriptionService: SubscriptionService
    ) {
        const stripeApiKey = this.configService.get('STRIPE_API_KEY') || '';
        this.axiosConfig = {
            baseURL: this.configService.get('STRIPE_API') || 'https://api.stripe.com/v1/',
            headers: {
                Authorization: `Bearer ${stripeApiKey as string}`,
            },
        };
    }

    async generateSubscriptionLink(plan: SubscriptionPlans, userId?: number) {
        const pricingId = this.getPricingIdBySubscription(plan);
        // const pricingId = this.configService.get('STRIPE_FLAT_FEE_PRICE_ID') || '';

        this.logger.log(`Start stripe session for subscription plan '${plan}'`);
        const stripeSession = await this.createSession(plan, pricingId, userId);
        const sessionLog = {
            id: stripeSession?.id,
            url: stripeSession?.url,
            success_url: stripeSession?.success_url,
            cancel_url: stripeSession?.cancel_url,
        };
        this.logger.log(`Stripe session created ${JSON.stringify(sessionLog)}`);
        return stripeSession.url;
    }

    private getPricingIdBySubscription(plan: SubscriptionPlans): string {
        if (plan === SubscriptionPlans.MONTH) {
            return this.configService.get('STRIPE_MONTH_PRICE_ID') || '';
        }

        if (plan === SubscriptionPlans.YEAR) {
            return this.configService.get('STRIPE_YEAR_PRICE_ID') || '';
        }

        throw new BadRequestException('Invalid subscription');
    }

    private createSession(plan: SubscriptionPlans, pricingId: string, userId?: number) {
        const frontSubscriptionUrl = `${this.configService.get('FRONTEND_URL') as string}pricing`; // ToDO in env?
        const serverApiUrl = `${
            this.configService.get('SERVER_API_URL') as string
        }stripe/subscription-callback`;
        let params = '?stripe_session_id={CHECKOUT_SESSION_ID}';
        params += `&plan=${plan}`;
        if (userId) {
            params += `&user_id=${userId}`;
        }
        const successUrl = serverApiUrl + params;

        return this.stripeClient.checkout.sessions.create({
            line_items: [{ price: pricingId, quantity: 1 }],
            payment_method_types: ['card'],
            // mode: 'payment',
            mode: 'subscription',
            success_url: successUrl,
            cancel_url: frontSubscriptionUrl,
            // subscription_data: {
            //   trial_period_days: 30
            // };
        });
    }

    // async getUserIdByStripeCustomer(stripeCustomer: Stripe.Customer): Promise<{ userId: number, isExists: boolean }> {
    //   const stripeSession: Stripe.Checkout.Session = await this.getSessionById(stripeSessionId);
    // }

    async getStripeSessionById(stripeSessionId: string): Promise<Stripe.Checkout.Session> {
        const stripeSession: Stripe.Checkout.Session = await this.getSessionById(stripeSessionId);

        if (!stripeSession || stripeSession.expires_at * 1000 < Date.now()) {
            throw new UnauthorizedException({ statusCode: 401, message: 'Session expired' });
        }

        return stripeSession;
    }

    // async createUnlimitedSubscriptionForUser(userId: number) {
    //     this.logger.log(`Start create unlimited subscription for user ${userId}`);
    //     return this.subscriptionService.storeUnlimited(userId);
    // }

    async createSubscriptionForUser(
        userId: number,
        plan: SubscriptionPlans,
        subscription: string | Stripe.Subscription | null
    ) {
        // if (!subscription || typeof subscription === 'string') {
        //     throw new BadRequestException(
        //         `Error on subscription creating. Subscription: ${subscription as string}`
        //     );
        // }
        // // return this.subscriptionService.store(userId, plan, subscription);
        // return this.subscriptionService.store({
        //     subscriptionId: subscription.id,
        //     subscriptionStart: new Date(subscription.current_period_start * 1000),
        //     subscriptionEnd: new Date(subscription.current_period_end * 1000),
        //     trialStart: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
        //     trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
        //     userId,
        //     plan,
        // });
    }

    async getOrCreateUser(
        stripeCustomer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
        userId?: number
    ): Promise<{ userId: number; isExists: boolean }> {
        if (userId) {
            const existsUser = await this.userService.findOne({ id: userId });
            if (existsUser) {
                this.logger.log(`Stripe customer founded in database by user_id ${userId}`);
                return { userId: existsUser.id, isExists: true };
            }
        }

        const customer = stripeCustomer as Stripe.Customer;

        if (!customer?.email) {
            throw new BadGatewayException(
                `Doesn't get customer email. Customer:${JSON.stringify(customer)}`
            );
        }

        const existsUser = await this.userService.findOne({ email: customer.email });
        if (existsUser) {
            this.logger.log(`Stripe customer founded in database by ${existsUser.email}`);
            return { userId: existsUser.id, isExists: true };
        }

        const newUser: UserDto = {
            email: customer.email,
            name: customer.name || '',
            password: 'from stripe', // ToDo
        };

        this.logger.log(
            `Stripe customer NOT founded in database create user ${JSON.stringify(newUser)}`
        );
        const createdUser = await this.userService.store(newUser);
        return { userId: createdUser.id, isExists: false };
    }

    // private async getUserByStripeCustomerId(stripeCustomerId: string): Promise<User> {
    //   const customer: Stripe.Customer = await this.getCustomerById(stripeCustomerId);
    //   this.logger.log(`Stripe customer from stripe-api. ${JSON.stringify(customer)}`);
    //   return this.getOrCreateCustomer(customer);
    // }
    //
    // private getCustomerById(id: string): Promise<Stripe.Customer> {
    //   const url = `${this.axiosConfig.baseURL as string}customers/${id}`;
    //   this.logger.log(`Get customer from stripe API. ${url}`);
    //
    //   return this.httpService.get(`customers/${id}`, { ...this.axiosConfig })
    //     .pipe(
    //       map((axiosResponse: AxiosResponse) => axiosResponse.data as Stripe.Customer)
    //     )
    //     .toPromise();
    // }

    public getSessionById(id: string): Promise<Stripe.Checkout.Session> {
        const url = `${
            this.axiosConfig.baseURL as string
        }checkout/sessions/${id}?expand[]=customer`;
        this.logger.log(`Get session from stripe API. ${url}`);

        return this.httpService
            .get(`checkout/sessions/${id}?expand[]=customer&expand[]=subscription`, {
                ...this.axiosConfig,
            })
            .pipe(
                map((axiosResponse: AxiosResponse) => axiosResponse.data as Stripe.Checkout.Session)
            )
            .toPromise();
    }
    //
    // private getSubscriptionById(id: string): Promise<Stripe.Subscription> {
    //   const url = `${this.axiosConfig.baseURL as string}sessions/${id}?expand[]=customer`;
    //   this.logger.log(`Get subscription from stripe API. ${url}`);
    //
    //   return this.httpService.get(`sessions/${id}?expand[]=customer`,
    //     { ...this.axiosConfig })
    //     .pipe(
    //       map((axiosResponse: AxiosResponse) => axiosResponse.data as Stripe.Subscription)
    //     )
    //     .toPromise();
    // }

    // async onSubscriptionUpdate(subscription: Stripe.Subscription) {
    //     this.logger.log(
    //         `Run stripe webhook 'onSubscriptionUpdate' handler ${JSON.stringify(subscription)}`
    //     );
    //     return this.onSubscriptionChange(subscription);
    // }

    // private async onSubscriptionChange(subscription: Stripe.Subscription) {
    //     const existsSub = await this.subscriptionService.getSubscriptionByStripeId(subscription.id);
    //
    //     if (existsSub) {
    //         await this.subscriptionService.updateById(existsSub.id, subscription);
    //     }
    // }
}
