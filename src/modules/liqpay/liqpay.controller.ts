import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    Logger, Post,
    Query,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { LiqPayService } from './liqpay.service';
import { UserService } from '../user/user.service';
import { StripeCallbackQuery } from './models/liqpay-cb.model';
import { AuthService } from '../auth/services/auth.service';
import { SubscriptionPlans } from './subscription.service';
import { SubscriptionQuery } from './models/subscription-query.model';
import { Public } from '../auth/auth.guard';

// @UsePipes(new ValidationPipe(validationOptions))
@Public()
@Controller('liqpay')
export class LiqPayController {
    private readonly logger = new Logger('LiqPayModule');

    constructor(
        private readonly liqPayService: LiqPayService,
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {}

    @Get('subscription')
    async liqPaySubscription(@Query() query: SubscriptionQuery) {
        const { subscription, language, user_id: userId } = query;
        const checkoutUrl = await this.liqPayService.checkoutData(subscription, language, userId);
        if (!checkoutUrl) {
            throw new InternalServerErrorException('Error on building checkout subscription url');
        }
        return checkoutUrl;
    }

    // @Get('subscription-callback')
    // @HttpCode(HttpStatus.FOUND)
    // async resultCallback(
    //     @Res({ passthrough: true }) res: Response,
    //     @Query() query: StripeCallbackQuery,
    //     @Query('plan') plan: SubscriptionPlans,
    //     @Query('stripe_session_id') stripeSessionId: string,
    //     // @Query('session_id') sessionId: string,
    //     @Query('user_id') userIdFromSession: number
    // ) {
    //     console.log('query', query);
        // const stripeSession: Stripe.Checkout.Session =
        //     await this.stripeService.getStripeSessionById(stripeSessionId);
        // const { customer, subscription } = stripeSession;
        // const { userId, isExists } = await this.stripeService.getOrCreateUser(
        //     customer,
        //     userIdFromSession
        // );
        // if (!userIdFromSession) {
        // await this.videoOrderService.attachVideoToUserBySession(userId, sessionId);
        // }
        // ToDo uncomment for subscriptions mode
        // await this.stripeService.createSubscriptionForUser(userId, plan, subscription);
        // await this.stripeService.createUnlimitedSubscriptionForUser(userId);
        // await this.videoProcessingService.makeFullVideosForUser(userId); // ToDo without await

        // const accessToken = this.authService.buildJwtAccessToken(userId);
        // const frontUrl = this.configService.get('FRONTEND_URL');
        // return isExists
        //     ? res.redirect(`${frontUrl as string}auth/login`)
        //     : res.redirect(`${frontUrl as string}auth/new-password?accessToken=${accessToken}`);
        // return null;
    // }

    @Post('webhook')
    @HttpCode(HttpStatus.OK)
    async liqPayWebHook(
        @Res({ passthrough: true }) res: Response,
        @Body('data') encodedData,
        @Body('signature') signature
    ) {
        // ToDo add signature check https://www.liqpay.ua/documentation/api/callback
        // console.log(data);
        // console.log(signature);
        // var b = new Buffer(data, 'base64');
        const dataBuffer = Buffer.from(encodedData, 'base64');
        const data = JSON.parse(dataBuffer.toString());
        const { info, status, transaction_id, order_id } = data;
        console.log("-> status", status);
        console.log("-> transaction_id", transaction_id);
        console.log("-> order_id", order_id);
        console.log("-> data", data);
        if (info) {
            const { plan, userId: userIdPayload } = JSON.parse(info);
            console.log("-> userIdPayload", userIdPayload);
            console.log("-> plan", plan);
        }

        // const payload = JSON.parse(info);
        // console.log(data);

        // const stripeSession: Stripe.Checkout.Session =
        //     await this.liqPayService.getStripeSessionById(stripeSessionId);
        // const { customer, subscription } = stripeSession;
        // const { userId, isExists } = await this.liqPayService.getOrCreateUser(
        //     customer,
        //     userIdPayload
        // );
        // if (!userIdFromSession) {
            // await this.videoOrderService.attachVideoToUserBySession(userId, sessionId);
        // }
        // ToDo uncomment for subscriptions mode
        // await this.liqPayService.createSubscriptionForUser(userId, plan, subscription);
        // await this.stripeService.createUnlimitedSubscriptionForUser(userId);
        // await this.videoProcessingService.makeFullVideosForUser(userId); // ToDo without await

        // const accessToken = this.authService.buildJwtAccessToken(userId);
        // const frontUrl = this.configService.get('FRONTEND_URL');
        // return isExists
        //     ? res.redirect(`${frontUrl as string}auth/login`)
        //     : res.redirect(`${frontUrl as string}auth/new-password?accessToken=${accessToken}`);
        // return null;
        return 'OK';
    }

    // @Post('webhook')
    // @ApiOperation({ description: 'Used by stripe webhooks for get stripe events' })
    // async stripeWebhook(@Body() event: Stripe.Event) {
    //     this.logger.log(`Stripe webhook triggered ${JSON.stringify(event.type)}`);
    //     if (event.type === StripeEvents.SUBSCRIPTION_UPDATED) {
    //         await this.stripeService.onSubscriptionUpdate(event.data.object as Stripe.Subscription);
    //     } else if (event.type === StripeEvents.SUBSCRIPTION_CREATED) {
    //         // await this.stripeService.onSubscriptionCreate(event.data.object as Stripe.Subscription);
    //         // } else if (event.type === StripeEvents.SUBSCRIPTION_DELETED) {
    //         // ToDo
    //     } else if (event.type === StripeEvents.CHECKOUT_COMPLETED) {
    //         // const session = event.data.object as Stripe.Checkout.Session;
    //         // console.log('-> session', session);
    //     }
    // }
}
