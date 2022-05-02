import {Post, Route,SuccessResponse, Controller, Body, Get} from 'tsoa';
import {injectable} from 'tsyringe';
import { PurchaseRequest } from '../models/purchase';
import { PurchaseService } from '../services/purchase';



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
      throw new Error("Purchase customer name or product name is missing!");
    }

    if(!Array.isArray(purchaseRequest.products)){
      throw new Error("Purchase products is not array!");
    }

    try{
      await this.purchaseService.createPurchase(purchaseRequest);
    }catch(error: unknown ){
     throw new Error((error as {message:string}).message);
    }
  }

  @Get("/list")
  public async getPurchaseList() : Promise<string> {
    const purchaseList = await this.purchaseService.getListOfPurchase()
    return JSON.stringify(purchaseList);
  }
}
