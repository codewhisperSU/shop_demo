import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { Product } from './product';

export class ProductDto implements Product {
    @IsNotEmpty()
    @MaxLength(500, {
        message: 'Name is too long',
    })
    name!: string;

    @IsNotEmpty()
    @IsNumber()
    unit_price!: number;
}

export interface ProductListDto {
    data: Product[];
}
