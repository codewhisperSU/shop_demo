import express from "express";
import ProductController from "../controllers/product.controller";
import { ProductService } from "../services/product"


const router = express.Router();

/**
 * @openapi
 * /v1/product/add:
 *   post:
 *     summary: Add new product to system!
 *     requestBody:
 *      content:
 *       'application/json':
 *          schema:
 *              type: object
 *              properties:
 *                  name: 
 *                    type: string,
 *                  unit_price: 
 *                    type: number    
 *                          
 *          examples: 
 *              product:
 *                  summary: New product data
 *                  value: {
 *                      name: "Test customer",
 *                      unit_price: 123.0,
 *                      }
 *     responses:
 *       200:
 *         description: Returns void.
 */
router.post("/add", async (req: express.Request, res: express.Response, next) => {
    const controller = new ProductController(new ProductService());
    try{
        const response = await controller.addProduct(req.body);
        return res.send(response);
    }catch(error){
        next(error)
    }
})

/**
 * @openapi
 * /v1/product/list:
 *  get:
 *      responses:
 *          '200':
 *              description: return product list
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                          data:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties: 
 *                                       name:
 *                                          type: string
 *                                       unit_price: 
 *                                           type: number
 *                      examples:
 *                          data:
 *                              summary: List of product
 *                              value: { data: [{
 *                                  name: "Test product",
 *                                  unit_price: 123.0
 *                              }]}                          
 */
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