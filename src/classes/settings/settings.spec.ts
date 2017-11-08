import { expect } from 'chai';
import { Setting } from './settings'

describe ('Settings testing', () => {

    let setting1, setting2

    beforeEach(() => {
        setting1 = new Setting('testingName', 'testingValue');
    })
    
    it('Object should be correct', () => {
        expect(setting1.Name).to.equal('testingName');
        expect(setting1.Value).to.equal('testingValue');
        expect(setting1).to.have.property('value');
    })

    it('cloned object should be another object ', () => {
        setting2 = setting1;
        expect(setting1).to.equal(setting2)
        setting2 = setting1.clone();
        expect(setting1).to.not.equal(setting2)
    })

})