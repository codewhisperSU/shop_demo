import express from "express";
import CustomerController from "../controllers/customer.controller";
import { CustomerService } from "../services/customer"


const router = express.Router();

/**
 * @openapi
 * /v1/customer/add:
 *   post:
 *     summary: Add new customer to system!
 *     requestBody:
 *      content:
 *       'application/json':
 *          schema:
 *              type: object
 *              properties:
 *                  name: 
 *                    type: string,
 *                  address: 
 *                    type: string    
 *                          
 *          examples: 
 *              customer:
 *                  summary: New customer data
 *                  value: {
 *                      name: "Test customer",
 *                      address: "Test address",
 *                      }
 *     responses:
 *       200:
 *         description: Returns void.
 */
router.post("/add", async (req: express.Request, res: express.Response, next) => {
    const controller = new CustomerController(new CustomerService());
    try{
        const response = await controller.addCustomer(req.body);
        return res.send(response);
    }catch(error){
        next(error)
    }
})

/**
 * @openapi
 * /v1/customer/list:
 *  get:
 *      responses:
 *          '200':
 *              description: return customer list
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
 *                                          address: string
 *                      examples:
 *                          data:
 *                              summary: List of customers
 *                              value: { data: [{
 *                                  name: "Test customer",
 *                                  address: "Test address"
 *                              }] }                          
 */

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