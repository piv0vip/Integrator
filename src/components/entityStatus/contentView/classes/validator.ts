import { IValidator } from '../../../../interfaces'
import $ from 'jquery'

export abstract class Validator implements IValidator {
    abstract isValid(content: string): boolean;
}

export class TEXTValidator extends Validator {
    isValid(content: string): boolean {
        return true;
    }
}

export class XMLValidator extends Validator {
    isValid(content: string): boolean {
        try {
            var xmlDoc = $.parseXML(content)
            return true
        } catch (e) {
            return false;
        }
    }
}

export class JSONValidator extends Validator {
    isValid(content: string): boolean {
        try {
            JSON.parse(content);
            return true
        } catch (e) {
            return false;
        }
    }
}