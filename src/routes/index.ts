import express from "express";
import customerRouter from "./customer.router";
import productRouter from "./product.router";

const router = express.Router();

router.use("/customer", customerRouter);
router.use("/product", productRouter);

export default router;