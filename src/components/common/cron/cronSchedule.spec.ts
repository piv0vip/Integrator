import { expect } from 'chai';
import { CronSchedule } from './index';

let testValues = {
    '* * * * *': [
        '',
        //'-1',
        //'sds',
        //'60',
        //'60, -1',
        //'60'
    ]
}

describe('Cron Schedule testing', () => {

    let cs = new CronSchedule();

    beforeEach(() => {
    })

    it('Initial state of CronSchedule must be "* * * * *"', () => {
        expect(cs.toString()).to.equal('* * * * *');
    });

    it('Parser should return correct values', () => {
        for (let key in testValues) {
            let arr = testValues[key];
            for (let i = 0; i < arr.length; i++) {
                cs.Parse(arr[i]);
                expect(cs.toString()).to.equal('* * * * *');
            }
        }
    })
})