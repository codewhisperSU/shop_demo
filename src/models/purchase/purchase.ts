import { Customer } from '../customer/customer';
import { Product } from '../product';

export enum Status {
    UNLOCK,
    LOCK,
}

export interface PurchasePerCustomerProduct {
    purchaseDate: Date;
    customerName: string;
    customerAddress: string;
    purchaseProduct: Omit<Product, 'id'>[];
}

export interface Purchase {
    date: Date;
    customer: Customer;
    product: Product[];
}

export interface PurchaseList {
    data: PurchasePerCustomerProduct[];
}
