import type { Request, Response, NextFunction } from "express";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

type CreateOrderBody = {
  items: {
    productId: string;
    quantity: number;
  }[];
};

export async function createOrder(
  req: Request<{}, {}, CreateOrderBody>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return;
    }

    const { items } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ message: "주문 상품이 없습니다." });
      return;
    }

    let totalPrice = 0;

    const orderItems: {
      productId: string;
      quantity: number;
      price: number;
    }[] = [];

    for (const item of items) {
      if (item.quantity <= 0) {
        res.status(400).json({ message: "수량이 올바르지 않습니다." });
        return;
      }

      const product = await Product.findById(item.productId);

      if (!product) {
        res.status(404).json({ message: "상품을 찾을 수 없습니다." });
        return;
      }

      const price = product.price;
      totalPrice += price * item.quantity;

      orderItems.push({
        productId: product._id.toString(),
        quantity: item.quantity,
        price
      });
    }

    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      totalPrice,
      status: "pending"
    });

    res.status(201).json(order);

  } catch (error) {
    next(error);
  }
}