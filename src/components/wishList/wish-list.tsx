import Scrollbar from "@components/common/scrollbar";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useUI } from "@contexts/ui.context";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { wishListStore } from "src/store/wishList";
import WishListItems from "./wish-list-items";
import EmptyWhistList from "./empty-wish-list-";
import { useEffect, useState } from "react";

export default function WishList() {
  const { t } = useTranslation("common");
  const { closeWishlist } = useUI();

  // const userId = Cookies.get("userId");
  // const lang = useTranslation()

  // const wishList = GetProductWishList(userId , lang ,  );

  const items = wishListStore((state) => state.items);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full flex justify-between items-center relative ltr:pl-5 ltr:md:pl-7 rtl:pr-5 rtl:md:pr-7 py-0.5 border-b border-gray-100">
        <h2 className="m-0 text-xl font-bold md:text-2xl text-heading">
          {/* @ts-ignore */}
          {t("text-wish-List")}
        </h2>
        <button
          className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
          onClick={closeWishlist}
          aria-label="close"
        >
          <IoClose className="text-black mt-1 md:mt-0.5" />
        </button>
      </div>
      {items.length != 0 ? (
        <Scrollbar className="flex-grow w-full cart-scrollbar">
          <div className="w-full px-5 md:px-7">
            {items?.map((item) => (
              <WishListItems item={item} key={item.ID} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <motion.div
          layout
          initial="from"
          animate="to"
          exit="from"
          variants={fadeInOut(0.25)}
          className="flex flex-col items-center justify-center px-5 pt-8 pb-5 md:px-7"
        >
          <EmptyWhistList />
          <h3 className="pt-8 text-lg font-bold text-heading">
            {/* @ts-ignore */}
            {t("text-empty-cart")}
          </h3>
        </motion.div>
      )}
    </div>
  );
}
