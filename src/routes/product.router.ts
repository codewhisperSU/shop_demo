import express from "express";
import ProductController from "../controllers/product.controller";
import { ProductService } from "../services/product"


const router = express.Router();


router.post("/add", async (req: express.Request, res: express.Response, next) => {
    const controller = new ProductController(new ProductService());
    try{
        const response = await controller.addProduct(req.body);
        return res.send(response);
    }catch(error){
        next(error)
    }
})

router.get("/list", async (req: express.Request, res: express.Response, next) => {
    const controller = new ProductController(new ProductService());
    try{
    
        const response = await controller.getProductList();
        return res.send(response);
    }catch(error){
        next(error)
    }
})


export default router;