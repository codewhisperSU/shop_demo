import express from "express";
import customerRouter from "./customer.router";

const router = express.Router();

router.use("/customer", customerRouter);

export default router;