import { Post, Route, SuccessResponse, Controller, Body, Get } from 'tsoa'
import { injectable } from 'tsyringe'
import { ProductRequest } from '../models/product'
import { ProductService } from '../services/product'

@injectable()
@Route('product')
export default class ProductController extends Controller {
    constructor(private productService: ProductService) {
        super()
    }

    @SuccessResponse(201, 'Created')
    @Post('/add')
    public async addProduct(
        @Body() productRequest: ProductRequest
    ): Promise<void> {
        if (!productRequest.name || !productRequest.unit_price) {
            throw new Error('Name or unit price missing!')
        }

        try {
            await this.productService.createProduct(productRequest)
        } catch (error: unknown) {
            throw new Error((error as { message: string }).message)
        }
    }

    @Get('/list')
    public async getProductList(): Promise<string> {
        const customerList = await this.productService.getListOfProduct()
        return JSON.stringify(customerList)
    }
}
