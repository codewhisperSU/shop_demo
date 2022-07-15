import { singleton } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { Customer, CustomerList } from '../models/customer/customer';
import { CustomerDto } from '../models/customer';
import { CustomerListDto } from '../models/customer/customer.dto';
import {
    createCustomer,
    getListOfCustomer,
    findFirstCustomer,
} from '../db/customerHandling';

const prisma = new PrismaClient();

@singleton()
export class CustomerService {
    public async createCustomer(customer: CustomerDto): Promise<void> {
        const customerData = await findFirstCustomer(customer, {
            prisma: prisma,
        });

        if (customerData) {
            throw new Error('Customer found!');
        }

        try {
            await createCustomer(customer, { prisma: prisma });
        } catch {
            throw new Error('Cannot create customer!');
        }
    }

    public async getListOfCustomer(): Promise<CustomerListDto> {
        const customerList = await getListOfCustomer({ prisma: prisma });

        const customer = customerList.map((r) => {
            return { name: r.name, address: r.address } as Customer;
        });

        return { data: customer } as CustomerListDto;
    }
}
