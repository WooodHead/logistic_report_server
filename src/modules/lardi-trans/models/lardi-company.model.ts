export class LardiCompany implements LardiCompanyInterface {
    code: string;
    name: string;
    refId: number;
    rating: {
        positiveCommentCount: number;
        negativeCommentCount: number;
    };

    constructor(code, name, rating, refId) {
        this.code = code;
        this.name = name;
        this.rating = {
            positiveCommentCount: rating.positiveCommentCount,
            negativeCommentCount: rating.negativeCommentCount,
        };
        this.refId = refId;
    }
}

export interface RawLardiCompanyInterface {
    name: string;
    firmCode: string;
    refId: number;
    rating: {
        positiveCommentCount: number;
        negativeCommentCount: number;
    };
}

export interface LardiCompanyInterface {
    name: string;
    code: string;
    refId: number;
    rating: {
        positiveCommentCount: number;
        negativeCommentCount: number;
    };
}
