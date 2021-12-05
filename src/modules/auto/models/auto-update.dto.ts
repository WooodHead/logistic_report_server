import { IsNotEmpty } from 'class-validator';
import { AutoCreateDto } from './auto-create.dto';

export class AutoUpdateDto extends AutoCreateDto {
    @IsNotEmpty()
    id: number;
    companyId: number;
    autoBrandId: number;

    constructor() {
        super();
    }
}
