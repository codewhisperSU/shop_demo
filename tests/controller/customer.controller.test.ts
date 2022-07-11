import 'jest';
import request from 'supertest';
import 'reflect-metadata';
import createServer from '../../src/server';
import { readFileData } from '../../src/Helpers/readTestDataFile';

const app = createServer();

jest.mock('../../src/services/customer', () => {
    const customerService = {
        createCustomer: jest.fn(),
        getListOfCustomer: jest.fn(),
    };
    return { CustomerService: jest.fn(() => customerService) };
});

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

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('Get error when name and address missing! ', async () => {
        const notNameAndAddress = await request(app).post('/v1/customer/add');

        expect(notNameAndAddress.status).toEqual(500);
        const status = JSON.parse(notNameAndAddress.text);
        expect('Name cannot be empty or Address cannot be empty').toEqual(
            status.errorMessage
        );
    });

    it('Get error when name missing! ', async () => {
        const notName = await request(app)
            .post('/v1/customer/add')
            .send({ address: 'Test address' });

        expect(notName.status).toEqual(500);
        const status = JSON.parse(notName.text);
        expect('Name cannot be empty').toEqual(status.errorMessage);
    });

    it('Get error when address missing! ', async () => {
        const notAddress = await request(app)
            .post('/v1/customer/add')
            .send({ name: 'Test name' });

        expect(notAddress.status).toEqual(500);
        const status = JSON.parse(notAddress.text);
        expect('Address cannot be empty').toEqual(status.errorMessage);
    });

    it('Get error when name is too long! ', async () => {
        const notAddress = await request(app)
            .post('/v1/customer/add')
            .send({ name: longData, address: 'Test addess' });

        expect(notAddress.status).toEqual(500);
        const status = JSON.parse(notAddress.text);
        expect('Name length is too short or too big.').toEqual(
            status.errorMessage
        );
    });

    it('Get error when name is too short! ', async () => {
        const notAddress = await request(app)
            .post('/v1/customer/add')
            .send({ name: shortData, address: 'Test addess' });

        expect(notAddress.status).toEqual(500);
        const status = JSON.parse(notAddress.text);
        expect('Name length is too short or too big.').toEqual(
            status.errorMessage
        );
    });

    it('Get error when address is too long! ', async () => {
        const notAddress = await request(app)
            .post('/v1/customer/add')
            .send({ name: 'Test name for system', address: longData });

        expect(notAddress.status).toEqual(500);
        const status = JSON.parse(notAddress.text);
        expect('Address length is too big.').toEqual(status.errorMessage);
    });

    it('set address when short! ', async () => {
        const notAddress = await request(app)
            .post('/v1/customer/add')
            .send({ name: 'Test name for system', address: shortData });

        expect(notAddress.status).toEqual(200);
    });

    it('Get customer list! ', async () => {
        const getCustomerList = await request(app).get('/v1/customer/list');

        expect(getCustomerList.status).toEqual(200);
    });
});
