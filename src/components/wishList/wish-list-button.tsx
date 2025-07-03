import { useUI } from "@contexts/ui.context";
import { wishListStore } from "src/store/wishList";

import { HeartIcon } from "lucide-react";

export default function WishListButton() {
  const { openWishlist } = useUI();
  const items = wishListStore((state) => state.items);
  function handleWishListtOpen() {
    return openWishlist();
  }
  return (
    <button
      className="relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none"
      onClick={handleWishListtOpen}
      aria-label="cart-button"
    >
      <HeartIcon className=" w-[18px] h-[18px] xl:w-[23px] lg:h-[23px]" />
      <span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 rounded-full ltr:-right-2.5 ltr:xl:-right-3 rtl:-left-2.5 rtl:xl:-left-3 font-bold">
        {items.length}
      </span>
    </button>
  );
}
