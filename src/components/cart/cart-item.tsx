import Link from "@components/ui/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { IoIosCloseCircle } from "react-icons/io";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import usePrice from "@framework/product/use-price";
import { ROUTES } from "@utils/routes";

import { useTranslation } from "next-i18next";

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { t } = useTranslation("common");
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();

  const { price: totalPrice } = usePrice({
    amount: item.itemTotal,
    currencyCode: process.env.NEXT_PUBLIC_CURRENCY,
  });

  const code = process.env.NEXT_PUBLIC_CURRENCYL;

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className={`group w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`}
      title={item?.Name}
    >
      <div className="relative flex flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-200 rounded-md cursor-pointer md:w-28 md:h-28 ltr:mr-4 rtl:ml-4">
        <Image
          src={
            process.env.NEXT_PUBLIC_BASE_API_URL +
            item.FullImagePath +
            "_300X360.jpg"
          }
          width={112}
          height={112}
          loading="eager"
          alt={item?.name || "Product Image"}
          className="bg-gray-300"
          unoptimized
        />
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.ID)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <Link
          href={`${ROUTES.PRODUCT}/${item?.ID}`}
          className="truncate text-sm text-heading mb-1.5 -mt-1"
        >
          {item?.Name}
        </Link>
        {/* @ts-ignore */}
        <span className="text-sm text-gray-400 mb-2.5">
          {t("text-unit-price")} : &nbsp; {item?.Price} {code}
        </span>

        <div className="flex items-end justify-between">
          <Counter
            quantity={item?.Quantity}
            onIncrement={() => addItemToCart(item, 1)}
            onDecrement={() => removeItemFromCart(item.ID)}
            variant="dark"
          />
          <span className="text-sm font-semibold leading-5 md:text-base text-heading">
            {totalPrice}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
