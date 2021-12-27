export interface LiqpaySubscriptionInterface {
    payment_id: string;
    order_id: number;
    create_date: number;
    end_date: number;
    info: any;
    status: 'error' | 'failure' | 'reversed' | 'subscribed' | 'success' | 'unsubscribed';
    action: 'pay' | 'subscribe' | 'hold' | 'paysplit' | 'regular' | 'paydonate' | 'auth';
}
