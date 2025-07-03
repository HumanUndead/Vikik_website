import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import Image from "next/image";

type SearchProductProps = {
  item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ item }) => {
  return (
    <Link
      href={ROUTES.PRODUCT + "/" + item.Item1}
      className="flex items-center justify-start w-full h-auto group"
    >
      <div className="relative flex flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-200 rounded-md cursor-pointer ltr:mr-4 rtl:ml-4">
        <Image
          src={
            process.env.NEXT_PUBLIC_BASE_API_URL +
            "content/products/" +
            item.Item1 +
            "/" +
            item.Item1 +
            "_300X360.png"
          }
          width={96}
          height={96}
          loading="eager"
          alt={item?.name || "Product Image"}
          className="object-cover bg-gray-200"
          unoptimized
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="mb-2 text-sm truncate text-heading">{item.Item2}</h3>
        <div className="text-sm font-semibold text-heading">{item.item1}</div>
      </div>
    </Link>
  );
};

export default SearchProduct;
