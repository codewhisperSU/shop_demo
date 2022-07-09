import { Customer } from './customer';

export class CustomerDto implements Customer {
    name!: string;

    address!: string;
}

export interface CustomerListDto {
    data: Customer[];
}
