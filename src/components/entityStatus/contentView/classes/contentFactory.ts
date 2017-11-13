import { IContentFactory, IValidator, IContent } from '../../../../interfaces';
import * as Contents from './'; 
import $ from 'jquery';

export abstract class ContentFactory implements IContentFactory {

    content: string;

    constructor(content: string) {
        this.content = content;
    }

    abstract createContent(): Contents.Content;
    abstract createValidator(): IValidator;

    static getFactory(content: string): IContentFactory {
        if (content && Contents.Validator.isXML(content)) {
            return new XMLContentFactory(content);
        }
        if (content && Contents.Validator.isJSON(content)) {
            return new JSONContentFactory(content);
        }
        return new TEXTContentFactory(content); 
    }

}

export class TEXTContentFactory extends ContentFactory {
    createContent(): Contents.Content {
        return new Contents.TEXTContent(this.content, this.createValidator());
    }
    createValidator(): IValidator {
        return new Contents.TEXTValidator();
    }
}

export class XMLContentFactory extends ContentFactory {
    createContent(): Contents.Content {
        return new Contents.XMLContent(this.content, this.createValidator());
    }
    createValidator(): IValidator {
        return new Contents.XMLValidator();
    }
}

export class JSONContentFactory extends ContentFactory {
    createContent(): Contents.Content {
        return new Contents.JSONContent(this.content, this.createValidator());
    }
    createValidator(): IValidator {
        return new Contents.JSONValidator();
    }
}
