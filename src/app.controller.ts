import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ContactUsDto } from './models/contact-us.dto';
import { ContactUs as ContactUsEntity } from '@prisma/client';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('contact-us')
    contactUs(@Body() contactUsData: ContactUsDto): Promise<ContactUsEntity> {
        return this.appService.storeContactUs(contactUsData);
    }
}
