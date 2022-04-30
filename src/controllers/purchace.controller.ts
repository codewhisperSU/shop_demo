import {Post, Route,SuccessResponse, Controller, Body, Get} from 'tsoa';
import {injectable} from 'tsyringe';
import { PurchaseRequest } from '../models/purchase';
import { PurchaseService } from '../services/purchace';



@injectable()
@Route("purchase")
export default class PurchaseController extends Controller {
    constructor(private purchaseService: PurchaseService){
      super();
    }

  @SuccessResponse(201, "Created")
  @Post("/add")
  public async addPurchase(@Body() purchaseRequest: PurchaseRequest): Promise<void> {
    
    if(!purchaseRequest.customerName || purchaseRequest?.products?.length === 0){
      throw new Error("Customer name or product name is missing!");
    }

    try{
      await this.purchaseService.createPurchase(purchaseRequest);
    }catch(error: unknown ){
     throw new Error((error as {message:string}).message);
    }
  }

  @Get("/list")
  public async getPurchaseList() : Promise<string> {
    const customerList = await this.purchaseService.getListOfPurchase()
    return JSON.stringify(customerList);
  }
}
