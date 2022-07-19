import express from 'express';
import { param, validationResult } from 'express-validator';
import { container } from 'tsyringe';
import SearchController from '../controllers/search.controller';
import { convertValidationErrorToString } from '../Helpers/convertValidationErrorToString';
import { DatabaseService } from '../services/database';
import { SearchService } from '../services/search';

const databaseConnection = container.resolve(DatabaseService);
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
    param('name')
        .custom((value: string) => value.match(/^[A-Za-z 0-9]+$/))
        .withMessage('Search name cannot be hold special marks'),

    async (req: express.Request, res: express.Response, next) => {
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

        const controller = new SearchController(
            new SearchService(databaseConnection)
        );
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
