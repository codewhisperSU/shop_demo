import { Customer } from '../models/customer/customer';
import { CustomerDto } from '../models/customer';
import { CustomerListDto } from '../models/customer/customer.dto';
import { Context, MockContext } from '../../context';
import {
    createCustomer,
    getListOfCustomer,
    findFirstCustomer,
} from '../db/customerHandling';
import { IConnectionToDatabase } from '../models/database/IConnectionToDatabase';

export class CustomerService {
    constructor(
        private database: IConnectionToDatabase<Context | MockContext>
    ) {
        this.database = database;
    }

    public async createCustomer(customer: CustomerDto): Promise<void> {
        const customerData = await findFirstCustomer(customer, {
            prisma: this.database.connect().prisma,
        });

        if (customerData) {
            throw new Error('Customer found!');
        }

        try {
            await createCustomer(customer, {
                prisma: this.database.connect().prisma,
            });
        } catch {
            throw new Error('Cannot create customer!');
        }
    }

    public async getListOfCustomer(): Promise<CustomerListDto> {
        const customerList = await getListOfCustomer({
            prisma: this.database.connect().prisma,
        });

        const customer = customerList.map((r) => {
            return { name: r.name, address: r.address } as Customer;
        });

        return { data: customer } as CustomerListDto;
    }
}
