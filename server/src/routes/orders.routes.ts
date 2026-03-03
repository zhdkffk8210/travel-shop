import { Router } from "express";
import { createOrder, getMyOrders, payOrder } from "../controllers/orders.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

export const ordersRouter = Router();

ordersRouter.post("/", authMiddleware, createOrder);
ordersRouter.get("/my", authMiddleware, getMyOrders);

// 결제 완료 처리
ordersRouter.patch("/:id/pay", authMiddleware, payOrder);