import 'jest'
import 'reflect-metadata'
import ProductController from '../../src/controllers/product.controller'
import { ProductDto } from '../../src/models/product'
import { ProductService } from '../../src/services/product'

jest.mock('../../src/services/product', () => {
    const productService = {
        createProduct: jest.fn(),
        getListOfProduct: jest.fn(),
    }
    return { ProductService: jest.fn(() => productService) }
})

describe('Test product controller', () => {
    afterAll(() => {
        jest.clearAllMocks()
    })

    it('Get error when unit price missing! ', async () => {
        const productService = new ProductService()
        ;(
            productService.createProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce()
        ;(
            productService.getListOfProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce([{ name: 'Test product', unit_price: 120 }])

        const productDto = {
            name: 'Test product',
        } as ProductDto

        const productController = new ProductController(productService)
        try {
            await productController.addProduct(productDto)
        } catch (ex) {
            expect((ex as { message: string }).message).toBe(
                'Name or unit price missing!'
            )
        }
    })

    it('Get error when name missing! ', async () => {
        const productService = new ProductService()
        ;(
            productService.createProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce()
        ;(
            productService.getListOfProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce([{ name: 'Test product', unit_price: 120 }])

        const productDto = {
            unit_price: 120,
        } as ProductDto

        const productController = new ProductController(productService)
        try {
            await productController.addProduct(productDto)
        } catch (ex) {
            expect((ex as { message: string }).message).toBe(
                'Name or unit price missing!'
            )
        }
    })

    it('Get customer list! ', async () => {
        const productService = new ProductService()
        ;(
            productService.createProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce()
        ;(
            productService.getListOfProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce([{ name: 'Test product', unit_price: 120 }])

        const productController = new ProductController(productService)

        const data = await productController.getProductList()


        expect(data).toStrictEqual([{"name":"Test product","unit_price":120}])
    })
})
