import express from 'express';
import { check, validationResult } from 'express-validator';
import SearchController from '../controllers/search.controller';
import { SearchService } from '../services/search';
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
router.get(
    '/customerOrProductByName/:name',
    check('name')
        .notEmpty()
        .isString()
        .custom((value: string) => value.match(/^[A-Za-z 0-9]+$/))
        .withMessage(
            'Search name cannot be empty and name cannot be hold special marks'
        ),

    async (req: express.Request, res: express.Response, next) => {
        const validateResult = validationResult(req);

        if (!validateResult.isEmpty()) {
            next(validateResult.array());
        }

        const controller = new SearchController(new SearchService());
        try {
            const response = await controller.searchCustomerOrProductByName(
                req.params.name
            );
            return res.send(response);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
