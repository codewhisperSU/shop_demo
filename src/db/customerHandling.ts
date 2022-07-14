import { Context } from '../../context';
import { CustomerDto } from '../models/customer';

export async function createUser(customer: CustomerDto, ctx: Context) {
    return await ctx.prisma.customer.create({
        data: { name: customer.name, address: customer.address },
    });
}

export async function getListOfCustomer(ctx: Context) {
    return await ctx.prisma.customer.findMany();
}
