import { expect } from 'chai';
import { IContent, IContentFactory } from '../../../../interfaces';

import { Content, CSVContent, JSONContent, TEXTContent, XMLContent } from './content';
import { ContentFactory, TEXTContentFactory, XMLContentFactory, JSONContentFactory } from './contentFactory';

let textContent = 'simple content testing...';

let xmlContent = `<?xml version="1.0" encoding="utf-8"?>
                    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns="urn:enterprise.soap.sforce.com">
                    <soapenv:Body>
                        <createResponse>
                            <result>
                            <id>003D000000OY9omIAD</id>
                            <success>true</success>
                            </result>
                            <result>
                            <id>001D000000HTK3aIAH</id>
                            <success>true</success>
                            </result>
                        </createResponse>
                    </soapenv:Body>
                    </soapenv:Envelope>`;

let jsonContent = '{"metadata":{"$type":"PagedList.Core.PagedListMetaData, PagedList.Core","pageCount":1,"totalItemCount":2,"pageNumber":1,"pageSize":5,"isFirstPage":true,"isLastPage":true,"firstItemOnPage":1,"lastItemOnPage":2}}';

describe('Content class testing', () => {
    let emptyContentFactory: IContentFactory = ContentFactory.getFactory('');
    let textContentFactory: IContentFactory = ContentFactory.getFactory(textContent);
    let xmlContentFactory: IContentFactory = ContentFactory.getFactory(xmlContent);
    let jsonContentFactory: IContentFactory = ContentFactory.getFactory(jsonContent);

    it('emptyContentFactory should be instanceof TEXTContentFactory', () => {
        expect(emptyContentFactory).to.be.an.instanceof(TEXTContentFactory)
    })

    it('textContentFactory should be instanceof TEXTContentFactory', () => {
        expect(textContentFactory).to.be.an.instanceof(TEXTContentFactory)
        expect(textContentFactory).not.to.be.an.instanceof(XMLContentFactory)
        expect(textContentFactory).not.to.be.an.instanceof(JSONContentFactory)
    })

    it('xmlContentFactory should be instanceof XMLContentFactory', () => {
        expect(xmlContentFactory).to.be.an.instanceof(XMLContentFactory)
        expect(xmlContentFactory).not.to.be.an.instanceof(TEXTContentFactory)
        expect(xmlContentFactory).not.to.be.an.instanceof(JSONContentFactory)
    })

    it('jsonContentFactory should be instanceof JSONContentFactory', () => {
        expect(jsonContentFactory).to.be.an.instanceof(JSONContentFactory)
        expect(jsonContentFactory).not.to.be.an.instanceof(TEXTContentFactory)
        expect(jsonContentFactory).not.to.be.an.instanceof(XMLContentFactory)
    })

    describe('Simple TEXT content testing', () => {

        let content: Content = textContentFactory.createContent();

        it('content should be instance of TEXTcontent', () => {
            expect(content).to.be.an.instanceof(TEXTContent);
        })

        it('getContent() should return correct content', () => {
            expect(content.getContent()).to.equal(textContent)
        })

        it('getType() should be TEXT', () => {
            expect(content.getType()).to.equal('TEXT')
        })

        it('isValid() should be valid results', () => {
            expect(content.isValid(textContent)).to.be.true;
            expect(content.isValid(xmlContent)).to.be.true;
            expect(content.isValid(jsonContent)).to.be.true;
        })
    });

    describe('XML content testing', () => {

        let content: Content = xmlContentFactory.createContent()

        it('content should be instance of XMLcontent', () => {
            expect(content).to.be.an.instanceof(XMLContent);
        })

        it('getContent() should return correct content', () => {
            expect(content.getContent()).to.equal(xmlContent)
        })

        it('getType() should be XML', () => {
            expect(content.getType()).to.equal('XML')
        })

        it('isValid() should be valid results', () => {
            expect(content.isValid(xmlContent)).to.be.true;
            expect(content.isValid(textContent)).to.be.false;
            expect(content.isValid(jsonContent)).to.be.false;
        })
    })

    describe('JSON content testing', () => {

        let content: Content = jsonContentFactory.createContent()

        it('content should be instance of JSONContent', () => {
            expect(content).to.be.an.instanceof(JSONContent);
        })

        it('getContent() should return correct content', () => {
            expect(content.getContent()).to.equal(jsonContent)
        })

        it('getType() should be JSON', () => {
            expect(content.getType()).to.equal('JSON')
        })

        it('isValid() should be valid results', () => {
            expect(content.isValid(jsonContent)).to.be.true;
            expect(content.isValid(textContent)).to.be.false;
            expect(content.isValid(xmlContent)).to.be.false;
        })
    })

})