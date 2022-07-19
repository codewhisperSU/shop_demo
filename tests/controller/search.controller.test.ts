import 'jest';
import 'reflect-metadata';
import request from 'supertest';
import { container } from 'tsyringe';
import { TestConnectionService } from '../../src/services/testConnection';
container.register('IDatabase', { useClass: TestConnectionService });
import SearchController from '../../src/controllers/search.controller';
import createServer from '../../src/server';
import { SearchService } from '../../src/services/search';
import { DatabaseService } from '../../src/services/database';

const app = createServer();

jest.mock('../../src/services/search', () => {
    const searchService = {
        customerOrProductByName: jest.fn(),
    };
    return { SearchService: jest.fn(() => searchService) };
});

describe('Test search controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Get error when name missing! ', async () => {
        const notSearchName = await request(app).get(
            '/v1/search/customerOrProductByName/*'
        );

        expect(notSearchName.status).toEqual(500);
        const status = JSON.parse(notSearchName.text);
        expect('Search name cannot be hold special marks').toEqual(
            status.errorMessage
        );
    });

    it('Get error when parameter is missing! ', async () => {
        const notSearchName = await request(app).get(
            '/v1/search/customerOrProductByName/'
        );

        expect(notSearchName.status).toEqual(404);
    });

    it('Get search value! ', async () => {
        const fakeDatabase = container.resolve(DatabaseService);
        const searchService = new SearchService(fakeDatabase);
        (
            searchService.customerOrProductByName as jest.MockedFunction<any>
        ).mockResolvedValue({
            customer: [{ name: 'Test customer', address: 'Test address' }],
            product: [{ name: 'Test product', unit_price: 120 }],
        });

        const serviceController = new SearchController(searchService);

        const data = await serviceController.searchCustomerOrProductByName(
            'Test'
        );

        expect(data).toMatchObject({
            customer: [{ name: 'Test customer', address: 'Test address' }],
            product: [{ name: 'Test product', unit_price: 120 }],
        });
    });
});
