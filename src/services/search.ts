import { singleton } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { CustomerAndProductListDto } from '../models/search';

const prisma = new PrismaClient();

@singleton()
export class SearchService {
    public async customerOrProductByName(
        name: string
    ): Promise<CustomerAndProductListDto> {
        const customerList = await prisma.customer.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });

        const productList = await prisma.product.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });

        const customerOrProductList = {
            product: productList,
            customer: customerList,
        } as CustomerAndProductListDto;

        return customerOrProductList;
    }
}
