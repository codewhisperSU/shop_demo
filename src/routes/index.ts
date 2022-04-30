import express from "express";
import customerRouter from "./customer.router";
import productRouter from "./product.router";
import purchaseRouter from "./purchase.router";

const router = express.Router();

router.use("/customer", customerRouter);
router.use("/product", productRouter);
router.use("/purchase", purchaseRouter);

export default router;