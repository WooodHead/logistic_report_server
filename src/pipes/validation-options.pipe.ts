// export interface ValidatorOptionsInterface {
//     skipMissingProperties?: boolean;
//     whitelist?: boolean;
//     forbidNonWhitelisted?: boolean;
//     groups?: string[];
//     dismissDefaultMessages?: boolean;
//     validationError?: {
//         target?: boolean;
//         value?: boolean;
//     };
//
//     forbidUnknownValues?: boolean;
//     stopAtFirstError?: boolean;
// }

import { ValidationPipeOptions } from '@nestjs/common';

export const validatorOptions: ValidationPipeOptions = {
    stopAtFirstError: true,
    transform: true,
};
