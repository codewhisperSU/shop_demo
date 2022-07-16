import { Context } from '../../context';
import { Customer } from '../models/customer';
import { Product } from '../models/product';

export async function findManyCustomer(
    name: string,
    ctx: Context
): Promise<Customer[]> {
    return await ctx.prisma.customer.findMany({
        where: {
            name: {
                contains: name,
            },
        },
    });
}

export async function findManyProduct(
    name: string,
    ctx: Context
): Promise<Product[]> {
    return await ctx.prisma.product.findMany({
        where: {
            name: {
                contains: name,
            },
        },
    });
}
