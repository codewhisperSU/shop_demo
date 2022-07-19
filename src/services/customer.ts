import { singleton } from 'tsyringe';
import { Customer } from '../models/customer/customer';
import { CustomerDto } from '../models/customer';
import { CustomerListDto } from '../models/customer/customer.dto';
import {
    createCustomer,
    getListOfCustomer,
    findFirstCustomer,
} from '../db/customerHandling';
import { DatabaseService } from './database';

@singleton()
export class CustomerService {
    private database: DatabaseService;
    constructor(database: DatabaseService) {
        this.database = database;
    }

    public async createCustomer(customer: CustomerDto): Promise<void> {
        const customerData = await findFirstCustomer(customer, {
            prisma: this.database.connect,
        });

        if (customerData) {
            throw new Error('Customer found!');
        }

        try {
            await createCustomer(customer, { prisma: this.database.connect });
        } catch {
            throw new Error('Cannot create customer!');
        }
    }

    public async getListOfCustomer(): Promise<CustomerListDto> {
        const customerList = await getListOfCustomer({
            prisma: this.database.connect,
        });

        const customer = customerList.map((r) => {
            return { name: r.name, address: r.address } as Customer;
        });

        return { data: customer } as CustomerListDto;
    }
}
