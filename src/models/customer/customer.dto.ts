import { MaxLength } from 'class-validator';
import { Customer } from './customer';

export class CustomerDto implements Customer {
    @MaxLength(500, {
        message: 'Name is too long',
    })
    name!: string;
    @MaxLength(500, { message: 'Address is too long' })
    address!: string;
}

export interface CustomerListDto {
    data: Customer[];
}
