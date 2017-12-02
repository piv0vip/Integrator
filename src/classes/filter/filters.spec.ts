import { expect } from 'chai';
import { CheckBoxFilter, IFilter, ContainFilter, EntityStatatusFilters } from './index';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums'

import { EnumValues } from 'enum-values';

describe('ContainFilter testing', () => {

    let cf = new ContainFilter();

    it('isDefault testing', () => {
        expect(cf.isDefault()).to.be.true;
        cf.Value = 'test';
        expect(cf.isDefault()).to.be.false;
        cf.reset();
        expect(cf.isDefault()).to.be.true;
    })
})

describe('CheckBoxFilter testing', () => {

    let cbf = new CheckBoxFilter(['test1', 'test2']);

    it('isDefault testing', () => {
        expect(cbf.isDefault()).to.be.true;
        cbf.CheckedValues = ['test'];
        expect(cbf.isDefault()).to.be.false;
        cbf.reset();
        expect(cbf.isDefault()).to.be.true;
    })
})

describe('EntityStatusFilter testing', () => {
    let esf = new EntityStatatusFilters();

    it('isDefault testing', () => {
        expect(esf.isDefault()).to.be.true;
        esf.EntityStatuses.CheckedValues = [EntityStatusEnum.Confirmed.toString(), EntityStatusEnum.Ignored.toString()];
        expect(esf.isDefault()).to.be.false;
        esf.reset();
        expect(esf.isDefault()).to.be.true;
    })
})

describe('Enum filter testing', () => {
    let enumFilter: IFilter = new CheckBoxFilter(EnumValues.getNames(EntityStatusEnum));
    it('Type should be correct', () => {
        expect(enumFilter.Type).to.equal(FilterTypeEnum.StringList);
    })
})