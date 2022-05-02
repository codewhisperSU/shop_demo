import 'jest';
import "reflect-metadata"
import CustomerController from '../../src/controllers/customer.controller';
import { CustomerRequest } from '../../src/models/customer';
import {CustomerService} from '../../src/services/customer';

jest.mock('../../src/services/customer', () => {
    const customerService = {
        createCustomer: jest.fn(),
        getListOfCustomer: jest.fn(),
    }
    return {CustomerService: jest.fn(() => customerService)};
});

describe('Test customer controller', () => {

    afterAll(() => {
        jest.clearAllMocks();
    })

    it('Get error when address missing! ', async () =>{
       
        const customerService = new CustomerService();
        (customerService.createCustomer as jest.MockedFunction<any>).mockResolvedValueOnce();
        (customerService.getListOfCustomer as jest.MockedFunction<any>).mockResolvedValueOnce([{ name: "Test customer", address: "Test address" }]);

         const customerRequest = {
             name: "Test customer",
         } as CustomerRequest

          const customerController = new CustomerController(customerService);
          try{
          await customerController.addCustomer(customerRequest);
          }catch(ex){
            expect((ex as {message:string}).message).toBe("Name or address missing!");
          }  
    });

    it('Get error when name missing! ', async () =>{
       
        const customerService = new CustomerService();
        (customerService.createCustomer as jest.MockedFunction<any>).mockResolvedValueOnce();
        (customerService.getListOfCustomer as jest.MockedFunction<any>).mockResolvedValueOnce([{ name: "Test customer", address: "Test address" }]);

         const customerRequest = {
             address: "Test address"
         } as CustomerRequest

          const customerController = new CustomerController(customerService);
          try{
          await customerController.addCustomer(customerRequest);
          }catch(ex){
            expect((ex as {message:string}).message).toBe("Name or address missing!");
          }  
    });

    it('Get customer list! ', async () =>{
       
        const customerService = new CustomerService();
        (customerService.createCustomer as jest.MockedFunction<any>).mockResolvedValueOnce();
        (customerService.getListOfCustomer as jest.MockedFunction<any>).mockResolvedValueOnce([{ name: "Test customer", address: "Test address" }]);

    
        const customerController = new CustomerController(customerService);
         
         const data = await customerController.getCustomerList();

         expect(data).toBe('[{"name":"Test customer","address":"Test address"}]');
         
    });

})