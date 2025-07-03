import { Product } from "src/api/type";

export function createProductsJson(items: Product[]) {
  return items.map((item) => ({
    id: item.ID,
    qty: item.Quantity,
    notes: "",
  }));
}
