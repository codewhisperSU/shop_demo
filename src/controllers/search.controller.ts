import { Route, Controller, Get, Query, Path, Request } from 'tsoa'
import { injectable } from 'tsyringe'
import { SearchService } from '../services/search'

@injectable()
@Route('search')
export default class SearchController extends Controller {
    constructor(private searchService: SearchService) {
        super()
    }

    @Get(':name')
    public async searchCustomerOrProductByName(
        @Path('name') name: string
    ): Promise<string> {
        if (!name) {
            throw new Error('Search name is empty!')
        }

        const customerList = await this.searchService.customerOrProductByName(
            name
        )
        return JSON.stringify(customerList)
    }
}
