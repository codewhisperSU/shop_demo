import { Context } from '../../context';
import { Customer } from '../models/customer';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

interface PurchaseData {
    customerId: number;
    productIds: { id: number }[];
}

interface CustomerProductsData {
    customer: Customer;
    products: Product[];
}

type FindPurchases = Purchase & CustomerProductsData;

export async function findUniquePurchaseCustomer(
    customerName: String,
    ctx: Context
): Promise<Customer | null> {
    return ctx.prisma.customer.findUnique({
        where: {
            name: customerName as string,
        },
    });
}

export async function findManyProduct(
    products: string[],
    ctx: Context
): Promise<Product[]> {
    return ctx.prisma.product.findMany({
        where: {
            name: { in: products },
        },
    });
}

export async function createPurchase(purchaseData: PurchaseData, ctx: Context) {
    await ctx.prisma.purchase.create({
        data: {
            customerId: purchaseData.customerId,
            products: {
                connect: purchaseData.productIds,
            },
        },
    });
}

export async function findManyPurchase(ctx: Context) {
    return await ctx.prisma.purchase.findMany({
        include: {
            products: true,
            customer: true,
        },
    });
}
