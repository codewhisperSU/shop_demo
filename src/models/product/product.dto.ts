import { Product } from './product';

export class ProductDto implements Omit<Product, 'id'> {
    name!: string;

    unit_price!: number;
}

export interface ProductListDto {
    data: Product[];
}
