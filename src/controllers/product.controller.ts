import { Post, Route, SuccessResponse, Controller, Body, Get } from 'tsoa';
import { injectable } from 'tsyringe';
import { ProductDto, ProductList } from '../models/product';
import { ProductListDto } from '../models/product/product.dto';
import { ProductService } from '../services/product';

@injectable()
@Route('product')
export default class ProductController extends Controller {
    constructor(private productService: ProductService) {
        super();
    }

    @SuccessResponse(201, 'Created')
    @Post('/add')
    public async addProduct(@Body() productRequest: ProductDto): Promise<void> {
        try {
            await this.productService.createProduct(productRequest);
        } catch (error: unknown) {
            throw new Error((error as { message: string }).message);
        }
    }

    @Get('/list')
    public async getProductList(): Promise<ProductListDto> {
        return await this.productService.getListOfProduct();
    }
}
