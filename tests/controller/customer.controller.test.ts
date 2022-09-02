import 'jest';
import 'reflect-metadata';
import CustomerController from '../../src/controllers/customer.controller';
import { CustomerDto } from '../../src/models/customer';
import { CustomerService } from '../../src/services/customer';

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

    it('Get error when address missing! ', async () => {
        const customerService = new CustomerService();
        (
            customerService.createCustomer as jest.MockedFunction<any>
        ).mockResolvedValueOnce();
        (
            customerService.getListOfCustomer as jest.MockedFunction<any>
        ).mockResolvedValueOnce([
            { name: 'Test customer', address: 'Test address' },
        ]);

        const customerDto = {
            name: 'Test customer',
        } as CustomerDto;

        const customerController = new CustomerController(customerService);
        try {
            await customerController.addCustomer(customerDto);
        } catch (ex) {
            expect((ex as { message: string }).message).toBe(
                'Name or address missing!'
            );
        }
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

        const customerDto = {
            address: 'Test address',
        } as CustomerDto;

        const customerController = new CustomerController(customerService);
        try {
            await customerController.addCustomer(customerDto);
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

        expect(JSON.stringify(data)).toBe(
            '[{"name":"Test customer","address":"Test address"}]'
        );
    });
});
