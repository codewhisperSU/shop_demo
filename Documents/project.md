- create a product (name, unit price)
- create a customer (name, address)
- create a purchase (date, X products of different types for a Y customer)
- list products
- list customers
- list purchases (per customer/product)
- search product/customer by name

Enum Status{
unlock,
lock
}

Product {
id: number,
name: string,
unit_price: float,
}

Customer {
id: number,
name: string,
address: string,
}

Purchase {
id: number,
date: datetime,
customer: Customer,
product: Product,
status: Status
}
