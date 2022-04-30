
import { Customer } from "../customer/customer";
import { Product } from "../product";

export enum Status{
    UNLOCK,
    LOCK
}


export interface Purchase {
    date: Date;
    customer: Customer;
    product: Product[],
    status: Status
}

export interface PurchaseRequest {
    customerName: String;
    products: Product[],
}
  
export interface PurchaseList{
    data: Purchase[];
}