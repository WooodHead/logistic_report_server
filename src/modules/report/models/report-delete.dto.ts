import { IsNotEmpty } from 'class-validator';

export class ReportDeleteDto {
    @IsNotEmpty()
    reportIds: number[];
}
