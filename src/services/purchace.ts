import {singleton} from 'tsyringe';
import { PrismaClient} from '@prisma/client';
import { Customer, CustomerList } from '../models/customer/customer';
import { PurchaseRequest } from '../models/purchase';

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

    public async getListOfPurchase(): Promise<CustomerList>{
        const customerList = await prisma.customer.findMany();

        const customer = customerList.map(r => {
          return {  name: r.name, address: r.address
        } as Customer
        } );

        return {data: customer} as CustomerList;
    }
}