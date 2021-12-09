import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

// @ValidatorConstraint({ name: 'EmailExists', async: true })
// @Injectable()
// export class EmailExistsRule implements ValidatorConstraintInterface {
//     constructor(private readonly userService: UserService) {}
//
//     async validate(value: string): Promise<boolean> {
//         return this.userService.isUniqueEmail(value);
//     }
//
//     defaultMessage(args: ValidationArguments) {
//         return `User already exist`;
//     }
// }

@ValidatorConstraint({ name: 'UniqueEmailProvider', async: true })
@Injectable()
export class UniqueEmailProvider implements ValidatorConstraintInterface {
    constructor(protected readonly userService: UserService) {}

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const isExists = await this.userService.isEmailAlreadyExists(value);
        return !isExists;
    }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
    return function (object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailProvider,
        });
    };
}
