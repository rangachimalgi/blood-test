// utils/popularTests.js
import { products } from "./products";

export const popularTests = products.filter((p) =>
  ["P01", "2", "P03"].includes(p.id)
);