import { Router } from "express";
import { createOrder } from "../controllers/orders.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

export const ordersRouter = Router();

ordersRouter.post("/", authMiddleware, createOrder);