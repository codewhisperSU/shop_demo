import { Customer } from "../customer";
import { Product } from "../product";

export interface CustomerAndProductList{
    customer: Omit<Customer, "id">[];
    product: Omit<Product,"id">[]
}