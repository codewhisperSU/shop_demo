import 'jest';
import 'reflect-metadata';
import { Customer } from '@prisma/client';
import { container } from 'tsyringe';
import { CustomerService } from '../../src/services/customer';
import { TestConnectionService } from '../../src/db/testConnection';

describe('Test customer controller', () => {
    let fakeDatabase: TestConnectionService;
    beforeAll(() => {
        fakeDatabase = new TestConnectionService();
    });

    afterAll(() => {
        container.clearInstances();
    });

    it('Create new customer', async () => {
        const customer: Customer = {
            id: 1,
            name: 'Test user 1',
            address: 'Test address 1',
        };

        fakeDatabase.connect().prisma.customer?.create?.mockResolvedValue({
            id: 1,
            name: customer.name,
            address: customer.address,
        });

        const customerService = new CustomerService(fakeDatabase);

        await expect(customerService.createCustomer(customer)).resolves.toEqual(
            customer
        );
    });
});
