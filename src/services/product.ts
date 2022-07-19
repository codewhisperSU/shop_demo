import { singleton } from 'tsyringe';
import { Product, ProductList } from '../models/product/product';
import { ProductDto } from '../models/product';
import { ProductListDto } from '../models/product/product.dto';
import {
    createProduct,
    findFirstProduct,
    findManyCustomer,
} from '../db/productHandling';
import { DatabaseService } from './database';

@singleton()
export class ProductService {
    private database: DatabaseService;
    constructor(database: DatabaseService) {
        this.database = database;
    }

    public async createProduct(product: ProductDto): Promise<void> {
        const customerData = await findFirstProduct(product, {
            prisma: this.database.connect,
        });

        if (customerData) {
            throw new Error('Product found and price is same!');
        }

        try {
            await createProduct(product, { prisma: this.database.connect });
        } catch {
            throw new Error('Cannot create product!');
        }
    }

    public async getListOfProduct(): Promise<ProductListDto> {
        const productList = await findManyCustomer({
            prisma: this.database.connect,
        });

        const product = productList.map((r) => {
            return { name: r.name, unit_price: r.unit_price } as Product;
        });

        return { data: product } as ProductListDto;
    }
}
