import { singleton } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { Customer, CustomerList } from '../models/customer/customer';
import { Product, ProductList } from '../models/product/product';
import { ProductDto } from '../models/product';
import { ProductListDto } from '../models/product/product.dto';
import {
    createProduct,
    findFirstProduct,
    findManyCustomer,
} from '../db/productHandling';

const prisma = new PrismaClient();

@singleton()
export class ProductService {
    public async createProduct(product: ProductDto): Promise<void> {
        const customerData = await findFirstProduct(product, {
            prisma: prisma,
        });

        if (customerData) {
            throw new Error('Product found and price is same!');
        }

        try {
            await createProduct(product, { prisma: prisma });
        } catch {
            throw new Error('Cannot create product!');
        }
    }

    public async getListOfProduct(): Promise<ProductListDto> {
        const productList = await findManyCustomer({ prisma: prisma });

        const product = productList.map((r) => {
            return { name: r.name, unit_price: r.unit_price } as Product;
        });

        return { data: product } as ProductListDto;
    }
}
