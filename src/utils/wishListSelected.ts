import { wishListStore } from "src/store/wishList";

export function exisisProductInWishlistts(productID: number) {
  const items = wishListStore((state) => state.items);
  const productExists = items.some((item) => Number(item.ID) == productID);

  if (productExists) {
    return true;
  } else {
    return false;
  }
}
