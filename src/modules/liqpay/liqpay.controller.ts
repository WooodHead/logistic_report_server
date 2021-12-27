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
    async stripePayment(@Query() query: SubscriptionQuery) {
        const { subscription, language, user_id: userId } = query;
        const checkoutUrl = await this.liqPayService.generateSubscriptionLink(
            subscription,
            language,
            userId
        );
        if (!checkoutUrl) {
            throw new InternalServerErrorException('Error on building checkout subscription url');
        }
        return checkoutUrl;
        // res.set('Content-Type', 'text/html');
        // return res.send(Buffer.from(checkoutUrl));
        // return res.json(checkoutUrl);
    }

    @Post('subscription-callback')
    async stripeSessionCallback(
        @Res({ passthrough: true }) res: Response,
        @Body('data') data,
        @Body('signature') signature
    ) {
        console.log(data);
        console.log(signature);
        // const stripeSession: Stripe.Checkout.Session =
        //     await this.liqPayService.getStripeSessionById(stripeSessionId);
        // const { customer, subscription } = stripeSession;
        // const { userId, isExists } = await this.liqPayService.getOrCreateUser(
        //     customer,
        //     userIdFromSession
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
        return null;
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
