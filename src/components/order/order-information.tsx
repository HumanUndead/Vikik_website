import { IoCheckmarkCircle } from "react-icons/io5";
import OrderDetails from "@components/order/order-details";

import { useTranslation } from "next-i18next";
import { UserOrderGet } from "src/api/routs";
import Cookies from "js-cookie";
import { useLanguageCode } from "@utils/useTranslation";

import { useEffect, useState } from "react";
import { methodDelivery } from "@settings/method-delivery";

export default function OrderInformation({ orderId }: any) {
  const [order, setOrder] = useState<string | undefined>(undefined);

  const fetchOrder = async () => {
    const orderDetails = await UserOrderGet(
      Cookies.get("userId"),
      orderId,
      lang
    );
    setOrder(orderDetails);
    return order;
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const lang = useLanguageCode();
  const { t } = useTranslation("common");
  console.log(order);
  return (
    <div className="xl:px-32 2xl:px-44 3xl:px-56 py-16 lg:py-20">
      <div className="border border-gray-300 bg-gray-50 px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-heading text-sm md:text-base mb-6 lg:mb-8">
        <span className="w-10 h-10 ltr:mr-3 rtl:ml-3 ltr:xl:mr-4 rtl:xl:ml-4 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-green-600" />
        </span>
        {t("text-order-received")}
      </div>

      <ul className="border border-gray-300 bg-gray-50 rounded-md flex flex-col md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {t("text-order-number")}:
          </span>
          {order?.OrderID}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {t("text-date")}:
          </span>
          {order?.OrderDate
            ? new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(order.OrderDate))
            : t("text-date-not-available")}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {t("text-email")}:
          </span>
          {order?.Email}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {t("text-total")}:
          </span>
          {order?.OrderTotal} JOD
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {t("text-payment-method")}:
          </span>
          {order?.MyDeliveryMethod == 1
            ? t(methodDelivery[0].Name)
            : t(methodDelivery[1].Name)}
        </li>
      </ul>

      <p className="text-heading text-sm md:text-base mb-8">
        {t("text-pay-cash")}
      </p>

      <OrderDetails orders={order} />
    </div>
  );
}
