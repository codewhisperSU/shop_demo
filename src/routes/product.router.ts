import express from 'express';
import { check, validationResult } from 'express-validator';
import { container } from 'tsyringe';
import ProductController from '../controllers/product.controller';
import { convertValidationErrorToString } from '../Helpers/convertValidationErrorToString';

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
 *                      name: "Test product",
 *                      unit_price: 123.0,
 *                      }
 *     responses:
 *       200:
 *         description: Returns response 200.
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
        check('name')
            .notEmpty()
            .withMessage('Name cannot be empty')
            .bail()
            .isString()
            .withMessage('Name include other letters than string')
            .bail()
            .isLength({ min: 5, max: 500 })
            .withMessage('Name length is too short or too big.')
            .bail(),

        check('unit_price')
            .isNumeric()
            .optional({ nullable: true })
            .withMessage('Unit price have to be number'),
    ],
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const validateResult = validationResult(req);

        if (!validateResult.isEmpty()) {
            const errorMessage = convertValidationErrorToString(
                validateResult.array(),
                ' or '
            );
            const error = new Error(errorMessage);
            next(error);
            return;
        }

        const controller = container.resolve(ProductController);

        try {
            const response = await controller.addProduct(req.body);
            return res.send(response);
        } catch (error) {
            next(error);
        }
    }
);

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
router.get(
    '/list',
    async (req: express.Request, res: express.Response, next) => {
        const controller = container.resolve(ProductController);

        try {
            const response = await controller.getProductList();
            return res.send(response);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
