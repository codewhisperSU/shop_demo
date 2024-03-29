import 'jest'
import 'reflect-metadata'
import SearchController from '../../src/controllers/search.controller'
import { SearchService } from '../../src/services/search'

jest.mock('../../src/services/search', () => {
    const searchService = {
        customerOrProductByName: jest.fn(),
    }
    return { SearchService: jest.fn(() => searchService) }
})

describe('Test search controller', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Get error when name missing! ', async () => {
        const searchService = new SearchService()
        ;(
            searchService.customerOrProductByName as jest.MockedFunction<any>
        ).mockResolvedValue()

        const searchController = new SearchController(searchService)
        try {
            await searchController.searchCustomerOrProductByName('')
        } catch (ex) {
            expect((ex as { message: string }).message).toBe(
                'Search name is empty!'
            )
        }
    })

    it('Get search value! ', async () => {
        const searchService = new SearchService()
        ;(
            searchService.customerOrProductByName as jest.MockedFunction<any>
        ).mockResolvedValue({
            customer: [{ name: 'Test customer', address: 'Test address' }],
            product: [{ name: 'Test product', unit_price: 120 }],
        })

        const searchController = new SearchController(searchService)

        const data = await searchController.searchCustomerOrProductByName(
            'Test'
        )


        expect(data).toStrictEqual(
            {"customer":[{"name":"Test customer","address":"Test address"}],"product":[{"name":"Test product","unit_price":120}]}

        )
    })
})
