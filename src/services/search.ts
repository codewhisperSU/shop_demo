import { CustomerAndProductListDto } from '../models/search';
import { findManyCustomer, findManyProduct } from '../db/searchHandling';
import { Context, MockContext } from '../../context';
import { IConnectionToDatabase } from '../models/database/IConnectionToDatabase';

export class SearchService {
    constructor(
        private database: IConnectionToDatabase<Context | MockContext>
    ) {
        this.database = database;
    }

    public async customerOrProductByName(
        name: string
    ): Promise<CustomerAndProductListDto> {
        const customerList = await findManyCustomer(name, {
            prisma: this.database.connect().prisma,
        });

        const productList = await findManyProduct(name, {
            prisma: this.database.connect().prisma,
        });

        const customerOrProductList = {
            product: productList,
            customer: customerList,
        } as CustomerAndProductListDto;

        return customerOrProductList;
    }
}
