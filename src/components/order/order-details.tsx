import { useTranslation } from "next-i18next";
import Image from "next/image";
import { methodDelivery } from "@settings/method-delivery";

const OrderItemCard = ({ product }: { product: any }) => {
  const price = process.env.NEXT_PUBLIC_CURRENCY;

  return (
    <tr
      className="font-normal border-b border-gray-300 last:border-b-0"
      key={product?.ID}
    >
      <td className="p-4 flex items-center">
        <Image
          src={
            process.env.NEXT_PUBLIC_BASE_API_URL +
            product.FullImagePath +
            "_300X300.jpg"
          }
          width={100}
          height={100}
          alt={product?.Name || "Product Image"}
          className="w-20 h-20  rounded-md"
          loading="lazy"
          quality={100}
          unoptimized
        />
        {product?.Name} * {product?.Quantity}
      </td>
      <td className="p-4">
        {product?.TotalPrice} {price}
      </td>
    </tr>
  );
};
const OrderDetails: React.FC<{ className?: string; orders: any }> = ({
  className = "pt-10 lg:pt-12",
  orders = [],
}) => {
  const { t } = useTranslation();
  const price = process.env.NEXT_PUBLIC_CURRENCY;

  return (
    <div className={className}>
      <h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
        {t("text-order-details")}:
      </h2>
      <table className="w-full text-sm font-semibold text-heading lg:text-base">
        <thead>
          <tr>
            <th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
              {t("text-product")}
            </th>
            <th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
              {t("text-total")}
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.Items?.map((product, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("common:order-number")}:</td>
            <td className="p-4">{orders?.OrderID}</td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("common:text-sub-total")}:</td>
            <td className="p-4">
              {orders?.Total} {price}
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("common:delivery-price")}:</td>
            <td className="p-4">
              {orders?.OrderTotal - orders?.Total} {price}
            </td>
          </tr>

          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("common:text-payment-method")}:</td>
            <td className="p-4">
              {orders?.MyDeliveryMethod == 1
                ? t(methodDelivery[0]?.Name)
                : t(methodDelivery[1]?.Name)}
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("common:text-total")}:</td>
            <td className="p-4">
              {orders?.OrderTotal} {price}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
