import { IContent, IValidator } from '../../../../interfaces'

export abstract class Content implements IContent, IValidator {

    content: string;
    validator: IValidator;

    constructor(content: string, validator: IValidator) {
        this.content = content;
        this.validator = validator;
    }

    public getContent(): string {
        return this.content;
    }

    public isValid(content: string): boolean {
        return this.validator.isValid(content);
    }

    abstract getType(): string;
}

export class XMLContent extends Content {
    getType(): string { return 'XML'}
}

export class JSONContent extends Content {
    getType(): string { return 'JSON' }
}

export class CSVContent extends Content {
    getType(): string { return 'CSV' }
}

export class TEXTContent extends Content {
    getType(): string { return 'TEXT' }
}