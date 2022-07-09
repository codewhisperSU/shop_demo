import 'jest';
import 'reflect-metadata';
import ProductController from '../../src/controllers/product.controller';
import { ProductDto } from '../../src/models/product';
import { ProductService } from '../../src/services/product';

jest.mock('../../src/services/product', () => {
    const productService = {
        createProduct: jest.fn(),
        getListOfProduct: jest.fn(),
    };
    return { ProductService: jest.fn(() => productService) };
});

describe('Test product controller', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('Get error when unit price missing! ', async () => {
        const productService = new ProductService();
        (
            productService.createProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce();
        (
            productService.getListOfProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce([{ name: 'Test product', unit_price: 120 }]);

        const customerRequest = {
            name: 'Test product',
        } as ProductDto;

        const customerController = new ProductController(productService);
        try {
            await customerController.addProduct(customerRequest);
        } catch (ex) {
            expect((ex as { message: string }).message).toBe(
                'Name or unit price missing!'
            );
        }
    });

    it('Get error when name missing! ', async () => {
        const productService = new ProductService();
        (
            productService.createProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce();
        (
            productService.getListOfProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce([{ name: 'Test product', unit_price: 120 }]);

        const customerRequest = {
            unit_price: 120,
        } as ProductDto;

        const customerController = new ProductController(productService);
        try {
            await customerController.addProduct(customerRequest);
        } catch (ex) {
            expect((ex as { message: string }).message).toBe(
                'Name or unit price missing!'
            );
        }
    });

    it('Get customer list! ', async () => {
        const productService = new ProductService();
        (
            productService.createProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce();
        (
            productService.getListOfProduct as jest.MockedFunction<any>
        ).mockResolvedValueOnce([{ name: 'Test product', unit_price: 120 }]);

        const customerController = new ProductController(productService);

        const data = await customerController.getProductList();

        expect(data).toBe('[{"name":"Test product","unit_price":120}]');
    });
});
