import { Customer } from './customer';

export class CustomerDto implements Omit<Customer, 'id'> {
    name!: string;
    address!: string;
}

export interface CustomerListDto {
    data: Customer[];
}
