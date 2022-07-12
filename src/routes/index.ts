import express from 'express';
import customerRouter from './customer.router';
import productRouter from './product.router';
import purchaseRouter from './purchase.router';
import SearchRouter from './search.router';

const router = express.Router();

router.use('/v1/search', SearchRouter);
router.use('/v1/customer', customerRouter);
router.use('/v1/product', productRouter);
router.use('/v1/purchase', purchaseRouter);

export default router;
