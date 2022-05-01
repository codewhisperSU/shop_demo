import {singleton} from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { CustomerAndProductList } from '../models/search';


const prisma = new PrismaClient();

@singleton()
export class SearchService {


    public async customerOrProductByName(name: string): Promise<CustomerAndProductList>{
    
        const customerList = await prisma.customer.findMany({
            where:{
                name: {
                    contains: name,
                }
            }
        });

        const productList = await prisma.product.findMany({
            where:{
                name: {
                    contains: name,
                }
            }
        });

        const customerOrProductList = {
            product: productList,
            customer: customerList,
        } as CustomerAndProductList;


        return customerOrProductList;
    }

}