import { Customer } from '@prisma/client';
import 'jest';
import { container } from 'tsyringe';
import { MockContext, Context, createMockContext } from '../../context';
import { CustomerDto } from '../../src/models/customer';
import { CustomerService } from '../../src/services/customer';
import { TestConnectionService } from '../../src/services/testConnection';

container.register('IDatabase', { useClass: TestConnectionService });

let mockCtx: MockContext;
let ctx: Context;

describe('Test customer controller', () => {
    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('Create new customer', () => {
        const customer: Customer = {
            id: 1,
            name: 'Test user 1',
            address: 'Test address 1',
        };

        mockCtx.prisma.customer.create.mockResolvedValue({
            id: 1,
            name: customer.name,
            address: customer.address,
        });

        const customerService = new CustomerService();
        await expext(customerService.createCustomer(customer));
    });
});
