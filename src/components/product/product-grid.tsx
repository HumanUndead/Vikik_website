import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import { useEffect, useState, type FC } from "react";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { prdoucstWithpages, Product } from "src/api/type";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface ProductGridProps {
  className?: string;
  data: prdoucstWithpages;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "", data }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const path = usePathname();
  const { query } = router;
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number>(Number(query.page) || 1);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (query.page) {
      setPageSize(Number(query.page));
    }
  }, [query.page]);

  useEffect(() => {
    if (load) {
      setAllProducts((prevProducts) => [
        ...prevProducts,
        ...(data?.products ?? []),
      ]);
      setLoad(false);
    } else {
      setAllProducts(data?.products ?? []);
    }
  }, [data?.products]);

  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {!allProducts?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          allProducts?.map((page) => (
            <ProductCard
              key={`product--key${page.ID}`}
              product={page}
              variant="grid"
            />
          ))
        )}
      </div>
      <div className="text-center pt-8 xl:pt-14">
        {pageSize < data.pages && (
          <Button
            variant="slim"
            q
            onClick={() => {
              setLoad(true);
              router.replace(
                {
                  pathname: `/${path}`,
                  query: {
                    ...query,
                    page: pageSize + 1,
                  },
                },
                undefined,
                { scroll: false }
              );
            }}
          >
            {t("button-load-more")}
          </Button>
        )}
      </div>
    </>
  );
};
