import { singleton } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { CustomerAndProductListDto } from '../models/search';
import { findManyCustomer, findManyProduct } from '../db/searchHandling';

const prisma = new PrismaClient();

@singleton()
export class SearchService {
    public async customerOrProductByName(
        name: string
    ): Promise<CustomerAndProductListDto> {
        const customerList = await findManyCustomer(name, { prisma: prisma });

        const productList = await findManyProduct(name, { prisma: prisma });

        const customerOrProductList = {
            product: productList,
            customer: customerList,
        } as CustomerAndProductListDto;

        return customerOrProductList;
    }
}
