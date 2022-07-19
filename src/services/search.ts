import { singleton } from 'tsyringe';
import { CustomerAndProductListDto } from '../models/search';
import { findManyCustomer, findManyProduct } from '../db/searchHandling';
import { DatabaseService } from './database';

@singleton()
export class SearchService {
    private database: DatabaseService;
    constructor(database: DatabaseService) {
        this.database = database;
    }

    public async customerOrProductByName(
        name: string
    ): Promise<CustomerAndProductListDto> {
        const customerList = await findManyCustomer(name, {
            prisma: this.database.connect,
        });

        const productList = await findManyProduct(name, {
            prisma: this.database.connect,
        });

        const customerOrProductList = {
            product: productList,
            customer: customerList,
        } as CustomerAndProductListDto;

        return customerOrProductList;
    }
}
