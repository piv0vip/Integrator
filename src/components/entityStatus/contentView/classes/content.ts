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
    public toHTML(): string {
        return beautify(this.getContent());
    }
}

export class JSONContent extends Content {
    getType(): string { return 'JSON'; }
    public toHTML(): string {
        return JSON.stringify(JSON.parse(this.getContent()), null, 3);
        //return jsonPrettyPrint.toHtml(this.getContent())
    }
}

export class CSVContent extends Content {
    getType(): string { return 'CSV'; }
}

export class TEXTContent extends Content {
    getType(): string { return 'TEXT'; }
}

var jsonPrettyPrint = {
    replacer: function (match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class=json-key>';
        var val = '<span class=json-value>';
        var str = '<span class=json-string>';
        var r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    },
    toHtml: function (obj) {
        var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, jsonPrettyPrint.replacer);
    }
};