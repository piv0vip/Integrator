import { expect } from 'chai';
import { FilterFactory, DateFilter, PeriodFilter, CheckBoxFilter, IFilter, ContainFilter } from './index';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums'

import { EnumValues } from 'enum-values';

import moment from 'moment';

//describe('ContainFilter testing', () => {

//    let cf = FilterFactory.getFilter(FilterTypeEnum.StringContains);

//    it('isDefault testing', () => {
//        expect(cf.isDefault()).to.be.true;
//        cf.FilterData = 'test';
//        expect(cf.isDefault()).to.be.false;
//        cf.reset();
//        expect(cf.isDefault()).to.be.true;
//    })
//})

//describe('CheckBoxFilter testing', () => {

//    let cbf = new CheckBoxFilter(['test1', 'test2']);

//    it('isDefault testing', () => {
//        expect(cbf.isDefault()).to.be.true;
//        cbf.FilterData = ['test'];
//        expect(cbf.isDefault()).to.be.false;
//        cbf.reset();
//        expect(cbf.isDefault()).to.be.true;
//    })
//})

//describe('PeriodFilter testing', () => {
//    let datePeriod: PeriodFilter;

//    beforeEach(() => {
//        datePeriod = new PeriodFilter();
//    });

//    it('init values testing', () => {
//        datePeriod.FilterData = { From: '2017-12-01', To: '2017-12-04' };
//        expect(datePeriod.toServer().from).to.equal('2017-12-01 00:00:00');
//        expect(datePeriod.toServer().to).to.equal('2017-12-04 23:59:59');
//    })

//    it('isDefault should be current date', () => {
//        let currentDate = moment(new Date()).utc().format('YYYY-MM-DD');
//        expect(datePeriod.FilterData).to.have.property('From', currentDate); 
//        expect(datePeriod.FilterData).to.have.property('To', currentDate); 

//        datePeriod.FilterData = { From: '2017-12-01', To: '2017-12-04' };
//        expect(datePeriod.FilterData).to.have.property('From', '2017-12-01');
//        expect(datePeriod.FilterData).to.have.property('To', '2017-12-04'); 

//        datePeriod.setToDefault();
//        expect(datePeriod.FilterData).to.have.property('From', currentDate);
//        expect(datePeriod.FilterData).to.have.property('To', currentDate); 
//    })
//})

//describe('DateFilter testing', () => {
//    let dateFilter: DateFilter;

//    beforeEach(() => {
//        dateFilter = new DateFilter();
//    });

//    it('init values testing', () => {
//        dateFilter.FilterData = '2017-12-01'
//        expect(dateFilter.toServer().from).to.equal('2017-12-01 00:00:00');
//        expect(dateFilter.toServer().to).to.equal('2017-12-01 23:59:59');
//    })

//    it('isDefault testing', () => {
//        expect(dateFilter.isDefault()).to.be.true;
//        dateFilter.FilterData = '2017-12-01';
//        expect(dateFilter.isDefault()).to.be.false;
//        dateFilter.setToDefault();
//        expect(dateFilter.isDefault()).to.be.true;
//    })
//})

//describe('Enum filter testing', () => {
//    debugger;
//    let enumFilter: IFilter = new CheckBoxFilter(EnumValues.getNames(EntityStatusEnum));
//    it('Type should be correct', () => {
//        expect(enumFilter.Type).to.equal(FilterTypeEnum.StringList);
//    })
//})