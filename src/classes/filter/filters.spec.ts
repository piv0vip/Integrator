import { expect } from 'chai';
import { CheckBoxFilter, IFilter } from './index';
import { EntityStatusEnum, FilterTypeEnum } from '../../enums'

import { EnumValues } from 'enum-values';


describe('Enum filter testing', () => {
    let enumFilter: IFilter = new CheckBoxFilter(EnumValues.getNames(EntityStatusEnum));
    it('Type should be correct', () => {
        expect(enumFilter.Type).to.equal(FilterTypeEnum.EnumCheckBoxes);
    })


})