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
import { AssignSubscriptionDto } from './models/assign-subscription.dto';

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

        // ToDO handle info for regular payment
        const { plan, userId: userIdPayload } = JSON.parse(info);
        this.logger.log(`liqpay webhook data info: ${info}`);

        await this.liqPayService.createSubscription(data, plan, +userIdPayload);
        return {};
    }

    @Post('assign')
    @HttpCode(HttpStatus.OK)
    async assignSubscription(@Body() assignSubscriptionDto: AssignSubscriptionDto) {
        const { email, orderId } = assignSubscriptionDto;
        return this.liqPayService.assignSubscription(email, orderId);
    }
}
