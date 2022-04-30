import express from "express";
import PurchaseController from "../controllers/purchace.controller";
import { PurchaseService } from "../services/purchace";



const router = express.Router();


router.post("/add", async (req: express.Request, res: express.Response, next) => {
    const controller = new PurchaseController(new PurchaseService());
    try{
        const response = await controller.addPurchase(req.body);
        return res.send(response);
    }catch(error){
        next(error)
    }
})

router.get("/list", async (req: express.Request, res: express.Response, next) => {
    const controller = new PurchaseController(new PurchaseService());
    try{
    
        const response = await controller.getPurchaseList();
        return res.send(response);
    }catch(error){
        next(error)
    }
})


export default router;