export interface Product {
    id?: number;
    name: string;
    unit_price: number;
}

export interface ProductList {
    data: Product[];
}
