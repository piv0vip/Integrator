import { IContent, IValidator } from '../../../../interfaces';
import beautify from 'xml-beautifier';

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

    public getTypeFormat(): string {
        return '';
    }

    public toHTML(): string {
        return this.getContent();
    }

    public isValid(content: string): boolean {
        return this.validator.isValid(content);
    }

    abstract getType(): string;
}

export class XMLContent extends Content {
    getType(): string { return 'XML'; }
    getTypeFormat(): string { return 'xml'; }
    public toHTML(): string {
        return beautify(this.getContent());
    }
}

export class JSONContent extends Content {
    getType(): string { return 'JSON'; }
    getTypeFormat(): string { return 'json'; }
    public toHTML(): string {
        return JSON.stringify(JSON.parse(this.getContent()), null, 3);
    }
}

export class CSVContent extends Content {
    getType(): string { return 'CSV'; }
}

export class TEXTContent extends Content {
    getType(): string { return 'TEXT'; }
}