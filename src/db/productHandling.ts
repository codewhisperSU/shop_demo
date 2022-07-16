import { Context } from '../../context';
import { ProductDto, Product } from '../models/product';

export async function createProduct(product: ProductDto, ctx: Context) {
    return await ctx.prisma.product.create({
        data: {
            name: product.name,
            unit_price: product.unit_price,
        },
    });
}

export async function findFirstProduct(product: ProductDto, ctx: Context) {
    return await ctx.prisma.product.findFirst({
        where: {
            name: product.name,
            AND: {
                unit_price: product.unit_price,
            },
        },
    });
}

export async function findManyCustomer(ctx: Context): Promise<Product[]> {
    return ctx.prisma.product.findMany();
}
