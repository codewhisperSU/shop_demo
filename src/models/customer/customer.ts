export interface Customer {
    name: string
    address: string
}

export interface CustomerRequest {
    name: string
    address: string
}

export interface CustomerList {
    data: Customer[]
}
