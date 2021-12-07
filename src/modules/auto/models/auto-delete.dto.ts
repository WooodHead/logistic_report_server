import { IsNotEmpty } from 'class-validator';

export class AutoDeleteDto {
    @IsNotEmpty()
    autoIds: number[];
}
