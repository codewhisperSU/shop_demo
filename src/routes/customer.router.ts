import express from 'express';
import { check, validationResult } from 'express-validator';
import CustomerController from '../controllers/customer.controller';
import { convertValidationErrorToString } from '../Helpers/convertValidationErrorToString';
import { CustomerService } from '../services/customer';

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
 *
 */
router.post(
    '/add',
    [
        check('name')
            .notEmpty()
            .withMessage('Name cannot be empty')
            .bail()
            .isString()
            .isLength({ min: 5, max: 500 })
            .withMessage('Name length is too short or too big.')
            .bail(),
        check('address')
            .isString()
            .withMessage('Address cannot be empty')
            .bail()
            .isLength({ min: 0, max: 500 })
            .withMessage('Address length is too big.')
            .bail(),
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

        const controller = new CustomerController(new CustomerService());
        try {
            const response = await controller.addCustomer(req.body);
            return res.send(response);
        } catch (error) {
            next(error);
        }
    }
);

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

router.get(
    '/list',
    async (req: express.Request, res: express.Response, next) => {
        const controller = new CustomerController(new CustomerService());
        try {
            const response = await controller.getCustomerList();
            return res.send(response);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
