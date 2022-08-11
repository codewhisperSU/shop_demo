import { Product } from '../models/product/product';
import { ProductDto } from '../models/product';
import { ProductListDto } from '../models/product/product.dto';
import { Context, MockContext } from '../../context';
import {
    createProduct,
    findFirstProduct,
    findManyCustomer,
} from '../db/productHandling';
import { IConnectionToDatabase } from '../models/database/IConnectionToDatabase';

export class ProductService {
    constructor(
        private database: IConnectionToDatabase<Context | MockContext>
    ) {
        this.database = database;
    }

    public async createProduct(product: ProductDto): Promise<void> {
        const customerData = await findFirstProduct(product, {
            prisma: this.database.connect().prisma,
        });

        if (customerData) {
            throw new Error('Product found and price is same!');
        }

        try {
            await createProduct(product, {
                prisma: this.database.connect().prisma,
            });
        } catch {
            throw new Error('Cannot create product!');
        }
    }

    public async getListOfProduct(): Promise<ProductListDto> {
        const productList = await findManyCustomer({
            prisma: this.database.connect().prisma,
        });

        const product = productList.map((r) => {
            return { name: r.name, unit_price: r.unit_price } as Product;
        });

        return { data: product } as ProductListDto;
    }
}
