import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Product } from "../models/product.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedProducts(): Promise<void> {
  const count = await Product.countDocuments();

  if (count > 0) {
    console.log("Products already exist. Skip seeding.");
    return;
  }

  const filePath = path.resolve("src/seed/products.json");

  const raw = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(raw);

  await Product.insertMany(products);

  console.log("Seeded products successfully.");
}