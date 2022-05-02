import 'jest';
import "reflect-metadata"
import PurchaseController from '../../src/controllers/purchase.controller';
import { PurchaseRequest } from '../../src/models/purchase';
import {PurchaseService} from '../../src/services/purchase';

jest.mock('../../src/services/purchase', () => {
    const purchaseService = {
        createPurchase: jest.fn(),
        getListOfPurchase: jest.fn(),
    }
    return {PurchaseService: jest.fn(() => purchaseService)};
});

describe('Test customer controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('Get error when address missing! ', async () =>{
       
        const purchaseService = new PurchaseService();
        (purchaseService.createPurchase as jest.MockedFunction<any>).mockResolvedValueOnce();
        (purchaseService.getListOfPurchase as jest.MockedFunction<any>).mockResolvedValue([{ name: "Test customer", address: "Test address" }]);

         const customerRequest = {
             customerName: "Test customer",
             products: []
         } as PurchaseRequest

          const purchaseController = new PurchaseController(purchaseService);
          try{
          await purchaseController.addPurchase(customerRequest);
          }catch(ex){
            expect((ex as {message:string}).message).toBe("Purchase customer name or product name is missing!");
          }  
    });

    it('Get error when name missing! ', async () =>{
       
        const purchaseService = new PurchaseService();
        (purchaseService.createPurchase as jest.MockedFunction<any>).mockResolvedValueOnce();
        (purchaseService.getListOfPurchase as jest.MockedFunction<any>).mockResolvedValue([{ name: "Test customer", address: "Test address" }]);

         const customerRequest = {
            products: [{
                name: "Product test"
            }]
         } as PurchaseRequest

         const purchaseController = new PurchaseController(purchaseService);
          try{
          await purchaseController.addPurchase(customerRequest);
          }catch(ex){
            expect((ex as {message:string}).message).toBe("Purchase customer name or product name is missing!");
          }  
    });

    it('Get purchase list! ', async () =>{
       
        const purchaseService = new PurchaseService();
        (purchaseService.createPurchase as jest.MockedFunction<any>).mockResolvedValueOnce();
        (purchaseService.getListOfPurchase as jest.MockedFunction<any>).mockResolvedValue([{ purchaseDate: "2.5.2022",customerName: "Test customer", customerAddress: "Test address", purchaseProduct: [{name: "Product test", unit_price: 123}]}]);

    
        const purchaseController = new PurchaseController(purchaseService);
         
         const data = await purchaseController.getPurchaseList();

         expect(data).toBe("[{\"purchaseDate\":\"2.5.2022\",\"customerName\":\"Test customer\",\"customerAddress\":\"Test address\",\"purchaseProduct\":[{\"name\":\"Product test\",\"unit_price\":123}]}]");
         
    });

})