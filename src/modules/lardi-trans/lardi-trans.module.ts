import { Module } from '@nestjs/common';
import { LardiTransController } from './lardi-trans.controller';
import { LardiTransService } from './lardi-trans.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    controllers: [LardiTransController],
    imports: [HttpModule],
    exports: [],
    providers: [LardiTransService],
})
export class LardiTransModule {}
