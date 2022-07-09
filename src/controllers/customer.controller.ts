import { Post, Route, SuccessResponse, Controller, Body, Get } from 'tsoa';
import { injectable } from 'tsyringe';
import { CustomerDto, CustomerList } from '../models/customer';
import { CustomerListDto } from '../models/customer/customer.dto';
import { CustomerService } from '../services/customer';

@injectable()
@Route('customer')
export default class CustomerController extends Controller {
    constructor(private customerService: CustomerService) {
        super();
    }

    @SuccessResponse(201, 'Created')
    @Post('/add')
    public async addCustomer(
        @Body() customerRequest: CustomerDto
    ): Promise<void> {
        try {
            await this.customerService.createCustomer(customerRequest);
        } catch (error: unknown) {
            throw new Error((error as { message: string }).message);
        }
    }

    @Get('/list')
    public async getCustomerList(): Promise<CustomerListDto> {
        return await this.customerService.getListOfCustomer();
    }
}
