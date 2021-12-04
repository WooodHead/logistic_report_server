import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    Logger,
    ParseIntPipe,
    Post,
    Query,
    Res,
    Session,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { StripeEvents, StripeService } from './stripe.service';
import { UserService } from '../user/user.service';
import { StripeCallbackQuery } from './models/stripe-cb.model';
import { AuthService } from '../auth/services/auth.service';
import { SubscriptionPlans } from './subscription.service';
import { SubscriptionQuery } from './models/subscription-query.model';
import { Public } from '../auth/auth.guard';

// @UsePipes(new ValidationPipe(validationOptions))
@Public()
@Controller('stripe')
export class StripeController {
    private readonly logger = new Logger('StripeModule');

    constructor(
        private readonly stripeService: StripeService,
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {}

    @Get('subscription')
    @HttpCode(HttpStatus.FOUND)
    async stripePayment(@Res() res: Response, @Query() query: SubscriptionQuery) {
        const { subscription, user_id: userId } = query;
        const stripeUrl = await this.stripeService.generateSubscriptionLink(subscription, userId);
        if (!stripeUrl) {
            throw new InternalServerErrorException('Error on building stripe subscription url');
        }
        return res.redirect(stripeUrl);
    }

    @Get('subscription-callback')
    @HttpCode(HttpStatus.FOUND)
    async stripeSessionCallback(
        @Res({ passthrough: true }) res: Response,
        @Query() query: StripeCallbackQuery,
        @Query('plan') plan: SubscriptionPlans,
        @Query('stripe_session_id') stripeSessionId: string,
        // @Query('session_id') sessionId: string,
        @Query('user_id') userIdFromSession: number
    ) {
        const stripeSession: Stripe.Checkout.Session =
            await this.stripeService.getStripeSessionById(stripeSessionId);
        const { customer, subscription } = stripeSession;
        const { userId, isExists } = await this.stripeService.getOrCreateUser(
            customer,
            userIdFromSession
        );
        // if (!userIdFromSession) {
            // await this.videoOrderService.attachVideoToUserBySession(userId, sessionId);
        // }
        // ToDo uncomment for subscriptions mode
        await this.stripeService.createSubscriptionForUser(userId, plan, subscription);
        // await this.stripeService.createUnlimitedSubscriptionForUser(userId);
        // await this.videoProcessingService.makeFullVideosForUser(userId); // ToDo without await

        const accessToken = this.authService.buildJwtAccessToken(userId);
        const frontUrl = this.configService.get('FRONTEND_URL');
        return isExists
            ? res.redirect(`${frontUrl as string}auth/login`)
            : res.redirect(`${frontUrl as string}auth/new-password?accessToken=${accessToken}`);
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
