import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    Logger,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
// import Stripe from 'stripe';
// import { ConfigService } from '@nestjs/config';
import { LiqPayService } from './liqpay.service';
// import { UserService } from '../user/user.service';
// import { StripeCallbackQuery } from './models/liqpay-cb.model';
// import { AuthService } from '../auth/services/auth.service';
// import { SubscriptionPlans } from './subscription.service';
import { SubscriptionQuery } from './models/subscription-query.model';
import { Public } from '../auth/auth.guard';
import { LiqpaySubscriptionInterface } from './models/liqpay-subscription.interface';

// @UsePipes(new ValidationPipe(validationOptions))
@Public()
@Controller('liqpay')
export class LiqPayController {
    private readonly logger = new Logger('LiqPayModule');

    constructor(private readonly liqPayService: LiqPayService) {}

    @Get('subscription')
    async liqPaySubscription(@Query() query: SubscriptionQuery) {
        const { subscription, language, user_id: userId } = query;
        const checkoutUrl = await this.liqPayService.checkoutData(subscription, language, userId);
        if (!checkoutUrl) {
            throw new InternalServerErrorException('Error on building checkout subscription url');
        }
        return checkoutUrl;
    }

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
        const dataString = dataBuffer.toString();
        const data = JSON.parse(dataString);
        this.logger.log(`liqpay webhook data: ${dataString}`);
        const { info, status, action } = data as LiqpaySubscriptionInterface;
        if (!(status === 'subscribed' || status === 'success')) {
            this.logger.warn(`Unhandled status '${status}' in liqpay webhook`);
            return;
        }

        if (!(action === 'subscribe' || action === 'regular')) {
            this.logger.warn(`Unhandled action '${action}' in liqpay webhook`);
            return;
        }

        const { plan, userId: userIdPayload } = JSON.parse(info);
        this.logger.log(`liqpay webhook data info: ${info}`);

        // const stripeSession: Stripe.Checkout.Session =
        //     await this.liqPayService.getStripeSessionById(stripeSessionId);
        // const { customer, subscription } = stripeSession;
        // const user: UserModel = await this.userService.findOne({ id: userIdPayload });
        await this.liqPayService.createSubscription(data, plan, userIdPayload);
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
