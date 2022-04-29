export interface Product {
    name: string;
    unit_price: number;
}

export interface ProductRequest {
     name: string;
     unit_price: number;
}
  
export interface ProductList{
    data: Product[];
}