import { Product } from '../product';
import { PurchasePerCustomerProduct } from './purchase';

export class PurchaseDto {
    customerName!: String;
    products!: Omit<Product, 'unit_price'>[];
}

export interface PurchaseListDto {
    data: PurchasePerCustomerProduct[];
}
