import { Injectable } from '@nestjs/common';
import { ContactUsDto } from './models/contact-us.dto';
import { PrismaService } from './services/prisma.service';
import { ContactUs as ContactUsEntity } from '@prisma/client';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    async storeContactUs(data: ContactUsDto): Promise<ContactUsEntity> {
        return this.prisma.contactUs.create({ data });
    }
}
