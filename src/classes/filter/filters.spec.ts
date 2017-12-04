import { expect } from 'chai';
import { DateFilter, PeriodFilter, CheckBoxFilter, IFilter, ContainFilter, EntityStatatusFilters } from './index';
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

describe('PeriodFilter testing', () => {
    let datePeriod: PeriodFilter;

    beforeEach(() => {
        datePeriod = new DateFilter();
    });

    it('init values testing', () => {
        datePeriod.From = '2017-12-01'
        datePeriod.To = '2017-12-04'
        expect(datePeriod.toServer().from).to.equal('2017-12-01 00:00:00');
        expect(datePeriod.toServer().to).to.equal('2017-12-04 23:59:59');
    })

    it('isDefault should be current date', () => {

    })
})

describe('DateFilter testing', () => {
    let datePeriod: DateFilter;

    beforeEach(() => {
        datePeriod = new DateFilter();
    });

    it('init values testing', () => {
        datePeriod.From = '2017-12-01'
        datePeriod.To = '2017-12-04'
        expect(datePeriod.toServer().from).to.equal('2017-12-01 00:00:00');
        expect(datePeriod.toServer().to).to.equal('2017-12-04 23:59:59');
    })

    it('isDefault testing', () => {
        expect(datePeriod.isDefault()).to.be.true;
        datePeriod.Date = '2017-12-01';
        expect(datePeriod.isDefault()).to.be.false;
        datePeriod.setToDefault();
        expect(datePeriod.isDefault()).to.be.true;
    })
})

describe('Enum filter testing', () => {
    let enumFilter: IFilter = new CheckBoxFilter(EnumValues.getNames(EntityStatusEnum));
    it('Type should be correct', () => {
        expect(enumFilter.Type).to.equal(FilterTypeEnum.StringList);
    })
})