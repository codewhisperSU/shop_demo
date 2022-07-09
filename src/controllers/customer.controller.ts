import { Post, Route, SuccessResponse, Controller, Body, Get } from 'tsoa'
import { injectable } from 'tsyringe'
import { CustomerRequest } from '../models/customer'
import { CustomerService } from '../services/customer'

@injectable()
@Route('customer')
export default class CustomerController extends Controller {
    constructor(private customerService: CustomerService) {
        super()
    }

    @SuccessResponse(201, 'Created')
    @Post('/add')
    public async addCustomer(
        @Body() customerRequest: CustomerRequest
    ): Promise<void> {
        if (!customerRequest.name || !customerRequest.address) {
            throw new Error('Name or address missing!')
        }

        try {
            await this.customerService.createCustomer(customerRequest)
        } catch (error: unknown) {
            throw new Error((error as { message: string }).message)
        }
    }

    @Get('/list')
    public async getCustomerList(): Promise<string> {
        const customerList = await this.customerService.getListOfCustomer()
        return JSON.stringify(customerList)
    }
}
