import { Context } from '../../context';
import { Customer, CustomerDto } from '../models/customer';

export async function createCustomer(customer: CustomerDto, ctx: Context) {
    return await ctx.prisma.customer.create({
        data: { name: customer.name, address: customer.address },
    });
}

export async function getListOfCustomer(ctx: Context): Promise<Customer[]> {
    return await ctx.prisma.customer.findMany();
}

export async function findFirstCustomer(
    customer: CustomerDto,
    ctx: Context
): Promise<Customer | null> {
    return await ctx.prisma.customer.findFirst({
        where: {
            name: customer.name,
            AND: {
                address: customer.address,
            },
        },
    });
}
