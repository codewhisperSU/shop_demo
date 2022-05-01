import {singleton} from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { PurchaseList, PurchaseRequest, Purchase } from '../models/purchase';
import { PurchasePerCustomerProduct } from '../models/purchase/purchase';

const prisma = new PrismaClient();

@singleton()
export class PurchaseService {

    public async createPurchase( purchase:PurchaseRequest): Promise<void>{

        const customerData = await prisma.customer.findUnique({
            where: {
                name: purchase.customerName as string
            }
        })

        if(!customerData){
            throw new Error("Not found customer!");
        }

        const productsName = purchase.products.map( r => r.name);

        const products = await prisma.product.findMany({
            where: {
                name: { in: productsName}
            }
        });

        if( products.length === purchase.products.length){

            const productIds = products.map(r => { return { id: r.id} });

         try{
          await prisma.purchase.create({
                data:{
                    customerId: customerData.id,
                    products: {
                        connect: productIds
                    },
                }
            });

        }catch{
            throw new Error("Create new purchase failed!");      
        }

       

        }else{
            throw new Error("Some product in system missing!");   
        }
    }

    public async getListOfPurchase(): Promise<PurchaseList>{
        const purchaseList = await prisma.purchase.findMany({
            include:{
                products: true,
                customer: true,
            }
        });

        const purchase = purchaseList.map(r => { return {
            purchaseDate: r.date,
            customerName: r.customer.name,
            customerAddress: r.customer.address,
            purchaseProduct: [...r.products.map(r => {
                return {
                    name: r.name,
                    unit_price: r.unit_price,
                }
            })]
        } as PurchasePerCustomerProduct})

       
        return {data: purchase} as PurchaseList;
    }
}