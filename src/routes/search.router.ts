import express from "express";
import SearchController from "../controllers/search.controller";
import { SearchService } from "../services/search";
const router = express.Router();

/**
 * @openapi
 * /v1/search/customerOrProductByName/{name}:
 *  get:
 *      parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Try find customer or product by name
 *         schema:
 *            type: string 
 *      responses:
 *          '200':
 *             description: Return product list and customer list.
 *             content:
 *               application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      product:
 *                        type: array
 *                        items:
 *                           type: object
 *                           properties:
 *                              name:
 *                               type: string
 *                              unit_price:
 *                               type: number
 *                      customer:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            name:
 *                             type: string
 *                            address:
 *                               type: string
 */
router.get("/customerOrProductByName/:name", async (req: express.Request, res: express.Response, next) => {
    const controller = new SearchController(new SearchService());
    try{
        const response = await controller.searchCustomerOrProductByName(req.params.name);
        return res.send(response);
    }catch(error){
        next(error)
    }
})

export default router;