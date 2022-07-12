import 'jest';
import 'reflect-metadata';
import request from 'supertest';
import { readFileData } from '../../src/Helpers/readTestDataFile';
import createServer from '../../src/server';

import { PurchaseService } from '../../src/services/purchase';

jest.mock('../../src/services/purchase', () => {
    const purchaseService = {
        createPurchase: jest.fn(),
        getListOfPurchase: jest.fn(),
    };
    return { PurchaseService: jest.fn(() => purchaseService) };
});

const app = createServer();

describe('Test customer controller', () => {
    var longData = '';
    var shortData = '';

    beforeAll(() => {
        readFileData('longText').then((longDataFromFile) => {
            longData = longDataFromFile;
        });

        readFileData('smallText').then((shortDataFromFile) => {
            shortData = shortDataFromFile;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Get error when customer name is empty! ', async () => {
        const notProductName = await request(app)
            .post('/v1/purchase/add')
            .send({
                customerName: null,
                products: [{ name: 'Product number one' }],
            });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('CustomerNAme cannot be empty').toEqual(status.errorMessage);
    });

    it('Get error when customer name is not string! ', async () => {
        const notProductName = await request(app)
            .post('/v1/purchase/add')
            .send({
                customerName: 12345677,
                products: [{ name: 'Product number one' }],
            });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('CustomerNAme is not string').toEqual(status.errorMessage);
    });

    it('Get error when name is too long! ', async () => {
        const notProductName = await request(app)
            .post('/v1/purchase/add')
            .send({
                customerName: longData,
                products: [{ name: 'Product number one' }],
            });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Name length is too short or too big').toEqual(
            status.errorMessage
        );
    });

    it('Get error when name is too short! ', async () => {
        const notProductName = await request(app)
            .post('/v1/purchase/add')
            .send({
                customerName: shortData,
                products: [{ name: 'Product number one' }],
            });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Name length is too short or too big').toEqual(
            status.errorMessage
        );
    });

    it('Get error when product name is not string! ', async () => {
        const notProductName = await request(app)
            .post('/v1/purchase/add')
            .send({
                customerName: 'Test customer name',
                products: [{ name: 1234566 }],
            });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Products.*.name is not string').toEqual(status.errorMessage);
    });

    it('Get error when product name is too long! ', async () => {
        const notProductName = await request(app)
            .post('/v1/purchase/add')
            .send({
                customerName: 'Test customer name',
                products: [{ name: longData }],
            });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Products name length is too short or too big').toEqual(
            status.errorMessage
        );
    });

    it('Get error when product name is too short! ', async () => {
        const notProductName = await request(app)
            .post('/v1/purchase/add')
            .send({
                customerName: 'Test customer name',
                products: [{ name: shortData }],
            });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Products name length is too short or too big').toEqual(
            status.errorMessage
        );
    });

    it('Get error when product data missing', async () => {
        const notProductName = await request(app)
            .post('/v1/purchase/add')
            .send({
                customerName: 'Test customer name',
                products: [],
            });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Missing Products information').toEqual(status.errorMessage);
    });

    it('Get purchase list! ', async () => {
        const getCustomerList = await request(app).get('/v1/purchase/list');

        expect(getCustomerList.status).toEqual(200);
    });
});
