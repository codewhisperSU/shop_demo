import { singleton } from 'tsyringe';
import { PurchaseDto, PurchaseList } from '../models/purchase';
import { PurchasePerCustomerProduct } from '../models/purchase/purchase';
import { PurchaseListDto } from '../models/purchase/purchase.dto';
import {
    createPurchase,
    findManyProduct,
    findManyPurchase,
    findUniquePurchaseCustomer,
} from '../db/purchaseHandling';
import { DatabaseService } from './database';

@singleton()
export class PurchaseService {
    private database: DatabaseService;
    constructor(database: DatabaseService) {
        this.database = database;
    }

    public async createPurchase(purchase: PurchaseDto): Promise<void> {
        const customerData = await findUniquePurchaseCustomer(
            purchase.customerName,
            { prisma: this.database.connect }
        );

        if (!customerData) {
            throw new Error('Not found customer!');
        }

        const productsName = purchase.products.map((r) => r.name);

        const products = await findManyProduct(productsName, {
            prisma: this.database.connect,
        });

        if (products.length === purchase.products.length) {
            const productIds = products.map((r) => {
                return { id: r.id ?? -1 };
            });

            try {
                await createPurchase(
                    {
                        customerId: customerData.id ?? -1,
                        productIds: productIds,
                    },
                    { prisma: this.database.connect }
                );
            } catch {
                throw new Error('Create new purchase failed!');
            }
        } else {
            throw new Error('Some product in system missing!');
        }
    }

    public async getListOfPurchase(): Promise<PurchaseListDto> {
        const purchaseList = await findManyPurchase({
            prisma: this.database.connect,
        });

        const purchase = purchaseList.map((r) => {
            return {
                purchaseDate: r.date,
                customerName: r.customer.name,
                customerAddress: r.customer.address,
                purchaseProduct: [
                    ...r.products.map((r) => {
                        return {
                            name: r.name,
                            unit_price: r.unit_price,
                        };
                    }),
                ],
            } as PurchasePerCustomerProduct;
        });

        return { data: purchase } as PurchaseListDto;
    }
}
