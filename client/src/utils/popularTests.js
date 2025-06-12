// utils/popularTests.js
import { products } from "./products";

export const popularTests = products.filter((p) =>
  ["P01", "2", "P03", "4", "5", "6","7", "8", "9"].includes(p.id)
);