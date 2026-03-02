import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ["국내", "해외"] },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 }
  },
  { timestamps: true }
);

export type ProductDocument = InferSchemaType<typeof productSchema>;

export const Product: Model<ProductDocument> =
  mongoose.models.Product ??
  mongoose.model<ProductDocument>("Product", productSchema);