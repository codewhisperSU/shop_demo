import 'jest';
import 'reflect-metadata';
import request from 'supertest';
import { readFileData } from '../../src/Helpers/readTestDataFile';
import createServer from '../../src/server';

const app = createServer();

jest.mock('../../src/services/product', () => {
    const productService = {
        createProduct: jest.fn(),
        getListOfProduct: jest.fn(),
    };
    return { ProductService: jest.fn(() => productService) };
});

describe('Test product controller', () => {
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

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('Get error when unit price is not string! ', async () => {
        const unitPriceMissing = await request(app)
            .post('/v1/product/add')
            .send({ name: 'Testi name', unit_price: 'This is not number' });

        expect(unitPriceMissing.status).toEqual(500);
        const status = JSON.parse(unitPriceMissing.text);
        expect('Unit price have to be number').toEqual(status.errorMessage);
    });

    it('Get error when product name missing! ', async () => {
        const notProductName = await request(app)
            .post('/v1/product/add')
            .send({ unit_price: 20.2 });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Name cannot be empty').toEqual(status.errorMessage);
    });

    it('Get error when product name is not string! ', async () => {
        const notProductName = await request(app)
            .post('/v1/product/add')
            .send({ name: 123456778, unit_price: 20.2 });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Name include other letters than string').toEqual(
            status.errorMessage
        );
    });

    it('Get error when product name is too long! ', async () => {
        const notProductName = await request(app)
            .post('/v1/product/add')
            .send({ name: longData, unit_price: 20.2 });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Name length is too short or too big.').toEqual(
            status.errorMessage
        );
    });

    it('Get error when product name is too short! ', async () => {
        const notProductName = await request(app)
            .post('/v1/product/add')
            .send({ name: shortData, unit_price: 20.2 });

        expect(notProductName.status).toEqual(500);
        const status = JSON.parse(notProductName.text);
        expect('Name length is too short or too big.').toEqual(
            status.errorMessage
        );
    });

    it('Get product list! ', async () => {
        const getCustomerList = await request(app).get('/v1/product/list');

        expect(getCustomerList.status).toEqual(200);
    });
});
