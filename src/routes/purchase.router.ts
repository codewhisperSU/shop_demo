import express from 'express';
import { check, validationResult } from 'express-validator';
import PurchaseController from '../controllers/purchase.controller';
import { PurchaseService } from '../services/purchase';

const router = express.Router();

/**
 * @openapi
 * /v1/purchase/add:
 *   post:
 *     summary: Add new purchase to system!
 *     requestBody:
 *      content:
 *       'application/json':
 *          schema:
 *              type: object
 *              properties:
 *                 customerName:
 *                    type: string
 *                 products:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          name:
 *                           type: string
 *
 *          examples:
 *              product:
 *                  summary: New purchase data
 *                  value: {
 *                      customerName: "Test customer",
 *                      products: [{
 *                              name: "Test product"
 *                             }]
 *                      }
 *     responses:
 *       200:
 *         description:  Returns response 200.
 *       500:
 *          description: Get error object and description
 *          content:
 *              application/json:
 *                  schema:
 *                     type: object
 *                     properties:
 *                       errorMessage:
 *                          type: string
 */

router.post(
    '/add',
    [
        check('customerName')
            .notEmpty()
            .withMessage('CustomerNAme cannot be empty')
            .isString()
            .isLength({ min: 5, max: 500 })
            .withMessage('Name length is too short or too big.'),

        check('products.*.name')
            .isString()
            .isLength({ min: 5, max: 500 })
            .withMessage('Products name length is too short or too big.'),
        check('products')
            .isArray({ min: 1 })
            .withMessage('Missing Products information'),
    ],
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const validateResult = validationResult(req);

        if (!validateResult.isEmpty()) {
            next(validateResult.array());
        }

        const controller = new PurchaseController(new PurchaseService());
        try {
            const response = await controller.addPurchase(req.body);
            return res.send(response);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @openapi
 * /v1/purchase/list:
 *  get:
 *      responses:
 *          '200':
 *              description: return purchase list
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
 *                                       purchaseDate:
 *                                          type: date
 *                                       customerName:
 *                                          type: string
 *                                       customerAddress:
 *                                          type: string
 *                                       purchaseProduct:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  name:
 *                                                    type: string
 *                                                  unit_price:
 *                                                     type: number
 *
 *                      examples:
 *                          data:
 *                              summary: List of purchase
 *                              value: { data: [{
 *                                  purchaseDate: "2022-04-30T06:42:53.785Z",
 *                                  customerName: "Test customer",
 *                                  customerAddress: "Test address",
 *                                  purchaseProduct: [{
 *                                          name: "Test product",
 *                                          unit_price: 123
 *                                      }]
 *                              }]}
 */

router.get(
    '/list',
    async (req: express.Request, res: express.Response, next) => {
        const controller = new PurchaseController(new PurchaseService());
        try {
            const response = await controller.getPurchaseList();
            return res.send(response);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
