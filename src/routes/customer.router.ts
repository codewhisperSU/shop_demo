import express from "express";
import CustomerController from "../controllers/customerController";
import { CustomerService } from "../services/customer"


const router = express.Router();


router.post("/add", async (req: express.Request, res: express.Response, next) => {
    const controller = new CustomerController(new CustomerService());
    try{
        const response = await controller.addCustomer(req.body);
        return res.send(response);
    }catch(error){
        next(error)
    }
})

router.get("/list", async (req: express.Request, res: express.Response, next) => {
    const controller = new CustomerController(new CustomerService());
    try{
    
        const response = await controller.getCustomerList();
        return res.send(response);
    }catch(error){
        next(error)
    }
})


export default router;