import 'jest';
import 'reflect-metadata';
import request from 'supertest';
import PurchaseController from '../../src/controllers/purchase.controller';
import { readFileData } from '../../src/Helpers/readTestDataFile';
import { PurchaseDto } from '../../src/models/purchase';
import createServer from '../../src/server';

import { PurchaseService } from '../../src/services/purchase';

jest.mock('../../src/services/purchase', () => {
    const purchaseService = {
        createPurchase: jest.fn(),
        getListOfPurchase: jest.fn(),
    };
    return { PurchaseService: jest.fn(() => purchaseService) };
});

const app = createServer();

describe('Test customer controller', () => {
    var longData = '';
    var shortData = '';

    beforeAll(() => {
        readFileData('longText').then((longDataFromFile) => {
            longData = longDataFromFile;
        });

        readFileData('smallText').then((shortDataFromFile) => {
            shortData = shortDataFromFile;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Get error when address missing! ', async () => {
        const purchaseService = new PurchaseService();
        (
            purchaseService.createPurchase as jest.MockedFunction<any>
        ).mockResolvedValueOnce();
        (
            purchaseService.getListOfPurchase as jest.MockedFunction<any>
        ).mockResolvedValue([
            { name: 'Test customer', address: 'Test address' },
        ]);

        const customerRequest = {
            customerName: 'Test customer',
            products: [],
        } as PurchaseDto;

        const purchaseController = new PurchaseController(purchaseService);
        try {
            await purchaseController.addPurchase(customerRequest);
        } catch (ex) {
            expect((ex as { message: string }).message).toBe(
                'Purchase customer name or product name is missing!'
            );
        }
    });

    it('Get error when name missing! ', async () => {
        const purchaseService = new PurchaseService();
        (
            purchaseService.createPurchase as jest.MockedFunction<any>
        ).mockResolvedValueOnce();
        (
            purchaseService.getListOfPurchase as jest.MockedFunction<any>
        ).mockResolvedValue([
            { name: 'Test customer', address: 'Test address' },
        ]);

        const customerRequest = {
            products: [
                {
                    name: 'Product test',
                },
            ],
        } as PurchaseDto;

        const purchaseController = new PurchaseController(purchaseService);
        try {
            await purchaseController.addPurchase(customerRequest);
        } catch (ex) {
            expect((ex as { message: string }).message).toBe(
                'Purchase customer name or product name is missing!'
            );
        }
    });

    it('Get purchase list! ', async () => {
        it('Get customer list! ', async () => {
            const getCustomerList = await request(app).get('/v1/purchase/list');

            expect(getCustomerList.status).toEqual(200);
        });
    });
});
