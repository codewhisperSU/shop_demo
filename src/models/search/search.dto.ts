import { Customer } from '../customer';
import { Product } from '../product';

export interface CustomerAndProductListDto {
    customer: Omit<Customer, 'id'>[];
    product: Omit<Product, 'id'>[];
}
