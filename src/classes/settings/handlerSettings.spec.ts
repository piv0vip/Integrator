import { expect } from 'chai';
import { HandlerSetting, HandlerSettings, DefaultHandlerSettings } from './handlerSettings';
import { Type } from '../../api/models';

describe('HandlerSetting testing', () => {

    let hs: HandlerSetting, hs1: HandlerSetting, hs2: HandlerSetting;

    beforeEach(() => {
        hs = new HandlerSetting('test', Type.String);
        hs1 = new HandlerSetting('test', Type.String, '32', null, true);
        hs2 = new HandlerSetting('test', Type.String, null, null, true);
    })

    it('Handler setting should be correct', () => {
        expect(hs).to.be.instanceof(HandlerSetting);
    })

    it('isValid() should be return correct value for required setting', () => {
        expect(hs.isValid()).to.be.true;

        expect(hs1.isValid()).to.be.true;
        hs1.Value = '';
        expect(hs1.isValid()).to.be.false;
        hs1.Value = '0';
        expect(hs1.isValid()).to.be.true;
        hs1.Value = '   ';
        expect(hs1.isValid()).to.be.false;
        expect(hs2.isValid()).to.be.false;
        hs2.Value = '45';
        expect(hs2.isValid()).to.be.true;
    })

    it('cloned object should be another object ', () => {
        hs = hs1;
        expect(hs).to.equal(hs1);
        hs = hs1.clone();
        expect(hs).to.not.equal(hs1)
    })

    it('resetToDefault() should be reset value to default state', () => {
        expect(hs1.isDefault()).to.be.true;
        expect(hs1.Value).to.equal('32');
        hs1.setValue('44');
        expect(hs1.isDefault()).to.be.false;
        expect(hs1.Value).to.equal('44');
        hs1.resetToDefault();
        expect(hs1.Value).to.equal('32');
        expect(hs1.isDefault()).to.be.true;
    })

});

describe('HandlerSettings testing', () => {

    let hs: HandlerSetting, hss: HandlerSettings;

    beforeEach(() => {
        hss = new HandlerSettings();
        hss.add(new HandlerSetting('testName', Type.String, 'testValue', null, true));
        hss.add(new HandlerSetting('test2Name', Type.Url));
    });

    it('size() shoud be retutn correct value', () => {
        expect(hss.size()).to.equal(2);
    })

    it('resetToDefault() should be reset values to default states', () => {
        expect(hss.isDefault()).to.be.true;
        hss.getValue('testName').setValue('jhg');
        expect(hss.isDefault()).to.be.false;
        hss.resetToDefault();
        expect(hss.isDefault()).to.be.true;
    })
});