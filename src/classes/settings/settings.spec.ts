import { expect } from 'chai';
import { Setting, Settings, CustomHandlerSettings } from './settings'

describe('Setting testing', () => {

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

});

describe('Settings testing', () => {

    let collectionSetting: Setting, notCollectionSetting: Setting;
    let settingCollection: Settings;

    beforeEach(() => {
        collectionSetting = new Setting('test1', 'test1');
        notCollectionSetting = new Setting('test2', 'test2');
        settingCollection = new CustomHandlerSettings();

        settingCollection.Add(new Setting('qqq', 'www'));
        settingCollection.Add(collectionSetting);
    })

    it('should be add new setting', () => {
        expect(settingCollection.count()).to.equal(2);
        settingCollection.Add(new Setting('test', 'test'));
        expect(settingCollection.count()).to.equal(3);
    })

    it('Has method should return existibility of setting in collection', () => {
        expect(settingCollection.has(collectionSetting)).to.be.true;
        expect(settingCollection.has(notCollectionSetting)).to.be.false;
    })

})