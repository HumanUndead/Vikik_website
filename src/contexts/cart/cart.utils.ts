import { Product } from "src/api/type";

export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  [key: string]: any;
}

export interface UpdateItemInput extends Partial<Omit<Product, "ID">> {}

export function addItemWithQuantity(
  items: Product[],
  item: Product,
  quantity: number
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.ID === item.ID
  );

  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].Quantity! += quantity;
    return newItems;
  }
  return [...items, { ...item, Quantity: quantity }];
}

export function removeItemOrQuantity(
  items: Product[],
  id: Product["ID"],
  quantity: number
) {
  console.log({ id, items, quantity });
  return items.reduce((acc: Product[], item) => {
    if (item.ID == id) {
      const newQuantity = item.Quantity! - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, Quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}
// Simple CRUD for Item
export function addItem(items: Product[], item: Product) {
  return [...items, item];
}

export function getItem(items: Product[], id: Product["ID"]) {
  return items.find((item) => item.ID === id);
}

export function updateItem(
  items: Product[],
  id: Product["ID"],
  item: UpdateItemInput
) {
  return items.map((existingItem) =>
    existingItem.ID === id ? { ...existingItem, ...item } : existingItem
  );
}

export function removeItem(items: Product[], id: Product["ID"]) {
  return items.filter((existingItem) => existingItem.ID != id);
}

export const calculateItemTotals = (items: Product[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.Price * item.Quantity!,
  }));

export const calculateTotal = (items: Product[]) =>
  items.reduce((total, item) => total + item.Quantity! * item.Price, 0);

export const calculateTotalItems = (items: Product[]) =>
  items.reduce((sum, item) => sum + item.Quantity!, 0);

export const calculateUniqueItems = (items: Product[]) => items.length;
