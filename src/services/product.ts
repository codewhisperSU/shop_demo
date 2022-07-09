import { singleton } from 'tsyringe'
import { PrismaClient } from '@prisma/client'
import { Customer, CustomerList } from '../models/customer/customer'
import { Product, ProductList, ProductRequest } from '../models/product/product'

const prisma = new PrismaClient()

@singleton()
export class ProductService {
    public async createProduct(product: ProductRequest): Promise<void> {
        const customerData = await prisma.product.findFirst({
            where: {
                name: product.name,
                AND: {
                    unit_price: product.unit_price,
                },
            },
        })

        if (customerData) {
            throw new Error('Product found and price is same!')
        }

        try {
            await prisma.product.create({
                data: {
                    name: product.name,
                    unit_price: product.unit_price,
                },
            })
        } catch {
            throw new Error('Cannot create product!')
        }
    }

    public async getListOfProduct(): Promise<ProductList> {
        const productList = await prisma.product.findMany()

        const product = productList.map((r) => {
            return { name: r.name, unit_price: r.unit_price } as Product
        })

        return { data: product } as ProductList
    }
}
