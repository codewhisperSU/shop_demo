
import { Customer } from "../customer/customer";
import { Product } from "../product";

export enum Status{
    UNLOCK,
    LOCK
}

export interface PurchasePerCustomerProduct{
    purchaseDate: Date;
    customerName: string;
    customerAddress: string;
    purchaseProduct: [{
        name: string;
        unit_price: number;
    }]

}


export interface Purchase {
    date: Date;
    customer: Customer;
    product: Product[];
}

export interface PurchaseRequest {
    customerName: String;
    products: Product[],
}
  
export interface PurchaseList{
    data: PurchasePerCustomerProduct[];
}