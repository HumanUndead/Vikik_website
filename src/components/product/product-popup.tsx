import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { useTranslation } from "next-i18next";
import { wishListStore } from "src/store/wishList";
import { prdoucstWithpages, Product } from "src/api/type";
import { exisisProductInWishlistts } from "@utils/wishListSelected";
import { GetProductDetails } from "src/api/routs";
import { useLanguageCode } from "@utils/useTranslation";
import { useQuery } from "@tanstack/react-query";
import ColorsAndSizesProduct from "@utils/colors-sizes-product";
import { TiHeartFullOutline } from "react-icons/ti";
import LoaderPopup from "@components/ui/loaders/loderPopup";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

export default function ProductPopup() {
  const { t } = useTranslation("common");
  const {
    modalData: { data },
    closeModal,
    openCart,
  } = useUI();

  const lang = useLanguageCode();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", data?.ID, lang],
    queryFn: () => GetProductDetails(data?.ID, lang),
    staleTime: Infinity,
    enabled: !!data?.ID, // prevent the query from running if ID is undefined
  });

  console.log(product);

  const router = useRouter();
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const code = process.env.NEXT_PUBLIC_CURRENCY;
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<Product | null>(null);
  const [productSelected, setProductSelected] = useState<any>(null);

  useEffect(() => {
    if (product?.length) {
      setProductSelected(product.product);
    }
  }, [product]);

  function addToCart() {
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
      setViewCartBtn(true);
    }, 600);

    addItemToCart(productSelected, quantity);
  }

  const notAddCart = () => {
    toast.error(t("add-to-cart-failed"), {
      position: "top-right",
      className: "!bg-white",
    });
  };
  function navigateToProductPage() {
    closeModal();
    router.push(
      {
        pathname: `${ROUTES.PRODUCT}/${data.ID}`,
        query: { name: product?.product?.Name },
      },
      undefined,
      { locale: router.locale }
    );
  }

  function navigateToCartPage() {
    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }

  function addtoWihsList(product: Product) {
    wishListStore.getState().addItem(product);
  }

  function removeFromWihsList(product: string) {
    wishListStore.getState().removeItem(product);
  }
  const isExsist = exisisProductInWishlistts(productSelected?.ID);
  const colorMap = ColorsAndSizesProduct(product?.sizes);

  console.log(first);

  return (
    <>
      <div
        className={`rounded-lg bg-white ${
          productSelected ? "" : "md:w-[650px] lg:w-[960px]"
        }`}
      >
        {productSelected || isLoading ? (
          <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
            <div className=" relative flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
              <Image
                src={
                  process.env.NEXT_PUBLIC_BASE_API_URL +
                  productSelected?.FullImagePath +
                  "_600X720.jpg"
                }
                width={600}
                height={720}
                alt={productSelected?.Name}
                className="lg:object-cover lg:w-full lg:h-full"
                unoptimized
              />
              {productSelected?.Quantity == 0 && (
                <span className=" absolute top-1 left-1 px-3 py-1 text-xs font-semibold text-white bg-heading rounded">
                  {t("outOfStock")}
                </span>
              )}
            </div>

            <div className="flex flex-col p-5 md:p-8 w-full">
              <div className="pb-5">
                <div className="mb-2 md:mb-2.5 -mt-1.5 flex justify-between items-center">
                  <h2
                    className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black"
                    onClick={navigateToProductPage}
                  >
                    {productSelected?.Name}
                  </h2>
                  <TiHeartFullOutline
                    color={isExsist ? "black" : "gray"}
                    onClick={() =>
                      isExsist
                        ? removeFromWihsList(productSelected?.ID)
                        : addtoWihsList(productSelected)
                    }
                    size={25}
                  />
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: productSelected?.Description,
                  }}
                  className="text-sm leading-6 md:text-body md:leading-7"
                ></p>

                <div className="flex items-center mt-3">
                  <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl ">
                    {productSelected?.Price} {code}
                  </div>
                  {product?.product?.OldPrice > 0 && (
                    <del className="font-segoe text-gray-400 text-base lg:text-xl ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0">
                      {productSelected.OldPrice} {code}
                    </del>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 text-sm font-medium">Color</div>
                <div className="flex gap-3 mb-4">
                  {Array.from(colorMap.values()).map(({ color }) => {
                    console.log(
                      "selectedColor?.Color?.ID:",
                      selectedColor?.Color?.ID,
                      "color?.Color.ID:",
                      color?.Color.ID,
                      "equal:",
                      selectedColor?.Color?.ID == color?.Color.ID
                    );
                    return (
                      <span
                        key={color?.Color?.ID}
                        className={`w-7 h-7 rounded-full border cursor-pointer ${
                          selectedColor?.Color?.ID == color?.Color.ID
                            ? "ring-2 ring-black"
                            : ""
                        }`}
                        style={{ backgroundColor: color?.Color?.Value }}
                        onClick={() => {
                          setSelectedColor(color);
                          setProductSelected(color);
                          setSelectedSize(null);
                        }}
                      />
                    );
                  })}
                </div>

                <>
                  <div className="mb-2 text-sm font-medium">Sizes</div>
                  <ul className="flex flex-wrap gap-2">
                    {colorMap
                      .get(
                        selectedColor?.Color?.ID ||
                          Array.from(colorMap.values())[0]?.color?.Color?.ID
                      )
                      ?.sizes.map((size, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSelectedSize(size);
                            setProductSelected(size);
                          }}
                          className={`px-3 py-1 border rounded text-sm cursor-pointer md:hover:bg-gray-100 ${
                            selectedSize?.Size?.Value === size?.Size?.Value
                              ? "bg-gray-400"
                              : ""
                          }`}
                        >
                          {size?.Size.Label}
                        </li>
                      ))}
                  </ul>
                </>
              </div>

              <div className="pt-2 md:pt-4">
                <div className="flex items-center justify-between mb-4 gap-x-3 sm:gap-x-4">
                  <Counter
                    quantity={quantity}
                    onIncrement={() => setQuantity((prev) => prev + 1)}
                    onDecrement={() =>
                      setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                    }
                    disableDecrement={quantity === 1}
                  />
                  <Button
                    onClick={
                      productSelected?.Quantity !== 0 ? addToCart : notAddCart
                    }
                    variant="flat"
                    className={`w-full h-11 md:h-12 px-1.5 `}
                    loading={addToCartLoader}
                  >
                    {t("text-add-to-cart")}
                  </Button>
                </div>
                <div className="flex justify-between gap-2">
                  {/* <Button
                onClick={() =>
                  isExsist
                    ? removeFromWihsList(productSelected?.ID)
                    : addtoWihsList(productSelected)
                }
                variant="flat"
                className={`w-full h-11 md:h-12 px-1.5
                  bg-gray-400 
                `}
              >
                {isExsist ? t("text-remove-from-wish") : t("text-add-to-wish")}
              </Button> */}

                  {viewCartBtn && (
                    <button
                      onClick={navigateToCartPage}
                      className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
                    >
                      {t("text-view-cart")}
                    </button>
                  )}
                </div>
                <Button
                  onClick={navigateToProductPage}
                  variant="flat"
                  className="w-full h-11 md:h-12 mt-2"
                >
                  {t("text-view-details")}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <LoaderPopup />
        )}
      </div>
      <ToastContainer />
    </>
  );
}
