import { Content } from '../components/entityStatus/contentView/classes/content'

export interface IContent {
    getType(): string;
    getContent(): string;
    toHTML(): string;
}

export interface IValidator {
    isValid(content: string): boolean;
}

export interface IContentFactory {
    createContent(): Content;
    createValidator(): IValidator;
}
