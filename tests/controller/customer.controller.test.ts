import 'jest';
import request from 'supertest';
import 'reflect-metadata';
import CustomerController from '../../src/controllers/customer.controller';
import { CustomerDto } from '../../src/models/customer';
import { CustomerService } from '../../src/services/customer';
import createServer from '../../src/server';

const app = createServer();

jest.mock('../../src/services/customer', () => {
    const customerService = {
        createCustomer: jest.fn(),
        getListOfCustomer: jest.fn(),
    };
    return { CustomerService: jest.fn(() => customerService) };
});

describe('Test customer controller', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('Get error when name and address missing! ', async () => {
        const notNameAndAddress = await request(app).post('/v1/customer/add');

        expect(notNameAndAddress).toEqual(500);
        //expect(notNameAndAddress.text).toBe();
        console.log(notNameAndAddress);
    });

    it('Get error when name missing! ', async () => {
        const customerService = new CustomerService();
        (
            customerService.createCustomer as jest.MockedFunction<any>
        ).mockResolvedValueOnce();
        (
            customerService.getListOfCustomer as jest.MockedFunction<any>
        ).mockResolvedValueOnce([
            { name: 'Test customer', address: 'Test address' },
        ]);

        const customerRequest = {
            address: 'Test address',
        } as CustomerDto;

        const customerController = new CustomerController(customerService);
        try {
            await customerController.addCustomer(customerRequest);
        } catch (ex) {
            expect((ex as { message: string }).message).toBe(
                'Name or address missing!'
            );
        }
    });

    it('Get customer list! ', async () => {
        const customerService = new CustomerService();
        (
            customerService.createCustomer as jest.MockedFunction<any>
        ).mockResolvedValueOnce();
        (
            customerService.getListOfCustomer as jest.MockedFunction<any>
        ).mockResolvedValueOnce([
            { name: 'Test customer', address: 'Test address' },
        ]);

        const customerController = new CustomerController(customerService);

        const data = await customerController.getCustomerList();

        expect(data).toMatchObject([
            { name: 'Test customer', address: 'Test address' },
        ]);
    });
});
