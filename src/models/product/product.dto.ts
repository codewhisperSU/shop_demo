import { Product } from './product';

export class ProductDto implements Product {
    name!: string;

    unit_price!: number;
}

export interface ProductListDto {
    data: Product[];
}
