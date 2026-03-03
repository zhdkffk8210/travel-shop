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

export async function getMyOrders(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return;
    }

    const orders = await Order.find({ userId: req.user.id })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    next(error);
  }
}

export async function payOrder(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return;
    }

    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({ message: "주문을 찾을 수 없습니다." });
      return;
    }

    // 내 주문만 결제 처리 가능
    if (order.userId.toString() !== req.user.id) {
      res.status(403).json({ message: "권한이 없습니다." });
      return;
    }

    // 이미 결제 완료면 그대로 반환
    if (order.status === "paid") {
      res.status(200).json(order);
      return;
    }

    order.status = "paid";
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}