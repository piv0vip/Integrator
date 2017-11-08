import { expect } from 'chai';
import { EnumValue, EnumValues, CustomEnumValues } from "../enums"
import { IEnumValue, IEnumValues } from '../interfaces'

describe('Enums test', () => {

    describe('EnumValue test', () => {
        let enumValue: IEnumValue;
        
            beforeEach(() => {
                enumValue = new EnumValue( 'key', 'name', 'description');
            });
        
            it('should be correct contents', () => {
                expect(enumValue.getCode()).to.equal('key')
                expect(enumValue.getDescription()).to.equal('description')
            })

            it('UndefinedEnum should be return correct EnumValue', () => {
                let enVal: EnumValue = EnumValue.getUndefinedEnum();
                expect(enVal).to.be.an.instanceof(EnumValue);
                expect(enVal.getCode()).to.equal('9999');
                expect(enVal.getDescription()).to.equal('Undefined Description');
            })
    })

    describe('EnumValues test', () => {

        let enumValues = new CustomEnumValues();

        enumValues.Load([
            {code: 'key1', name: 'name1', description: 'description1'}, 
            {code: 'key2', name: 'name2', description: 'description2'}, 
            {code: 'key3', name: 'name3'}]);

        beforeEach(() => {
        });

        it('Count of array should be 3', () => {
            expect(enumValues.asArray().length).to.equal(3)
        })

        it('select values to list should be correct', () => {
            let selectList: {value:string, text:string}[] = enumValues.asSelectList()
            expect(selectList[0].value).to.equal('key1');
            expect(selectList[0].text).to.equal('description1');
            expect(selectList[2].value).to.equal('key3');
            expect(selectList[2].text).to.equal('name3');
        })

        it('getEnumValueByCode should be return EnumValue', () => {
            let ev: IEnumValue = enumValues.getEnumValueByCode('key1');
            expect(ev).to.be.an.instanceof(EnumValue);
            expect(ev.getCode()).to.equal('key1');
            expect(ev.getDescription()).to.equal('description1');
            expect(enumValues.getEnumValueByCode('key2').getDescription()).to.equal('description2')
        })

        it('asArray should return an EnumValue[]', () => {
            let evArr: IEnumValue[] = enumValues.asArray();
            expect(evArr).to.have.lengthOf(3);
        })

        it('asSelectList should return an {value: string, text: string}[]', () => {
            let sellList : {value: string, text: string}[] = enumValues.asSelectList();
            expect(sellList).to.have.lengthOf(3);
            expect(sellList[0]).to.have.all.keys('value', 'text');
            expect(sellList[0].value).to.equal('key1');
        })
    })
})