import {singleton} from 'tsyringe';
import { PrismaClient} from '@prisma/client';
import { CustomerRequest } from '../models/customer';
import { Customer, CustomerList } from '../models/customer/customer';

const prisma = new PrismaClient();

@singleton()
export class CustomerService {

    public async createCustomer( customer:CustomerRequest): Promise<void>{

        const customerData = await prisma.customer.findFirst({
            where: {
                name: customer.name,
                AND: {
                    address: customer.address,
                }
            }
        })

        if(customerData){
            throw new Error("Customer found!");
        }

        try{
        await prisma.customer.create({
            data: {
                name:customer.name,
                address: customer.address
            }
        })
        }catch{
            throw new Error("Cannot create customer!");
        }
    }

    public async getListOfCustomer(): Promise<CustomerList>{
        const customerList = await prisma.customer.findMany();

        const customer = customerList.map(r => {
          return {  name: r.name, address: r.address
        } as Customer
        } );

        return {data: customer} as CustomerList;
    }
}