import type { Request, Response, NextFunction } from "express";
import { Product } from "../models/product.model.js";

type ProductsQuery = {
  category?: string;
  min?: string;
  max?: string;
  search?: string;
};

type ProductsResponse = {
  items: unknown[];
  count: number;
};

export async function getProducts(
  req: Request<{}, ProductsResponse, {}, ProductsQuery>,
  res: Response<ProductsResponse>,
  next: NextFunction
): Promise<void> {
  try {
    const { category, min, max, search } = req.query;

    const filter: Record<string, unknown> = {};

    // 카테고리 필터
    if (category) {
      if (category !== "국내" && category !== "해외") {
        res.status(400).json({ items: [], count: 0 });
        return;
      }
      filter.category = category;
    }

    // 가격 필터
    const minPrice = min ? Number(min) : undefined;
    const maxPrice = max ? Number(max) : undefined;

    if (min && isNaN(minPrice!)) {
      res.status(400).json({ items: [], count: 0 });
      return;
    }

    if (max && isNaN(maxPrice!)) {
      res.status(400).json({ items: [], count: 0 });
      return;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {
        ...(minPrice !== undefined ? { $gte: minPrice } : {}),
        ...(maxPrice !== undefined ? { $lte: maxPrice } : {})
      };
    }

    // 검색 필터
    if (search && search.trim() !== "") {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const products = await Product.find(filter).lean();

    res.json({
      items: products,
      count: products.length
    });

  } catch (error) {
    next(error);
  }
}