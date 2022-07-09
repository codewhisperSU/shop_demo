import { IsNotEmpty, MaxLength } from 'class-validator';
import { Product } from '../product';
import { Purchase, PurchasePerCustomerProduct } from './purchase';

export class PurchaseDto {
    @MaxLength(500, {
        message: 'CustomerName is too long',
    })
    customerName!: String;
    products!: Omit<Product, 'unit_price'>[];
}

export interface PurchaseListDto {
    data: PurchasePerCustomerProduct[];
}
