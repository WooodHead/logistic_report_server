export interface ValidatorOptionsInterface {
    skipMissingProperties?: boolean;
    whitelist?: boolean;
    forbidNonWhitelisted?: boolean;
    groups?: string[];
    dismissDefaultMessages?: boolean;
    validationError?: {
        target?: boolean;
        value?: boolean;
    };

    forbidUnknownValues?: boolean;
    stopAtFirstError?: boolean;
}

export const validatorOptions: ValidatorOptionsInterface = {
    stopAtFirstError: true,
};
