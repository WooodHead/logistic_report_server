import * as dotenv from 'dotenv';
import { StripeOptions } from 'nestjs-stripe';

dotenv.config();

const stripeConfig: StripeOptions = {
    apiKey: process.env.STRIPE_API_KEY || 'stripe-api-key',
    apiVersion: '2020-08-27',
};

export default stripeConfig;
