import Image from "next/image";
import { Product } from "src/api/type";

export const CheckoutItem: React.FC<{ item: Product }> = ({ item }) => {
  const code = process.env.NEXT_PUBLIC_CURRENCY;
  return (
    <div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
      <div className="relative shrink-0 border rounded-md border-gray-300 w-24 h-24 ">
        <Image
          src={
            process.env.NEXT_PUBLIC_BASE_API_URL +
            item.FullImagePath +
            "_300X360.jpg"
          }
          alt="currency"
          fill
          className="rounded-md "
          unoptimized
        />

        <span className="absolute top-0 left-0 bg-gray-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {item?.Quantity}
        </span>
      </div>
      <h6 className="text-sm ltr:pl-3 rtl:pr-3 font-regular text-heading">
        {item?.Name}
      </h6>

      <div className="flex ltr:ml-auto rtl:mr-auto text-heading text-sm ltr:pl-2 rtl:pr-2 flex-shrink-0">
        {item?.Price} {code}
      </div>
    </div>
  );
};
