import { IValidator } from '../../../../interfaces';
import $ from 'jquery';

export abstract class Validator implements IValidator {
    abstract isValid(content: string): boolean;

    public static isXML(text: string): boolean {
        try {
            let xmlDoc = $.parseXML(text);
            return true;
        } catch (e) {
            return false;
        }
    }

    public static isJSON(text: string): boolean {
        try {
            JSON.parse(text);
            return true;
        } catch (e) {
            return false;
        }
    }

}

export class TEXTValidator extends Validator {
    isValid(content: string): boolean {
        return true;
    }
}

export class XMLValidator extends Validator {
    isValid(content: string): boolean {
        return Validator.isXML(content);
    }
}

export class JSONValidator extends Validator {
    isValid(content: string): boolean {
        return Validator.isJSON(content);
    }
}