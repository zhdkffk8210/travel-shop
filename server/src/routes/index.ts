import { productsRouter } from "./products.routes.js";
import { ordersRouter } from "./orders.routes.js";
import { Router } from "express";
import { authRouter } from "./auth.routes.js";

export const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/auth", authRouter);