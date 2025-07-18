import Cart from "@components/cart/cart";
import { useUI } from "@contexts/ui.context";
import { Drawer } from "@components/common/drawer/drawer";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";
import WishList from "@components/wishList/wish-list";

const ManagedDrawer = () => {
  const { displayCart, closeCart, displayWihslist, closeWishlist } = useUI();

  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { right: 0 } : { left: 0 };
  return (
    <>
      <Drawer
        open={displayCart}
        placement={dir === "rtl" ? "left" : "right"}
        onClose={closeCart}
        styles={{
          wrapper: contentWrapperCSS,
        }}
        {...motionProps}
      >
        <Cart />
      </Drawer>

      <Drawer
        open={displayWihslist}
        placement={dir === "rtl" ? "left" : "right"}
        onClose={closeWishlist}
        styles={{
          wrapper: contentWrapperCSS,
        }}
        {...motionProps}
      >
        <WishList />
      </Drawer>
    </>
  );
};

export default ManagedDrawer;
