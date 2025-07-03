import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { Address, City, CreateAndUpdateAddress } from "src/api/type";
import { useEffect, useState } from "react";
import { cityStore } from "src/store/city";
import { createProductsJson } from "@utils/genrate-products-json";
import { useCart } from "@contexts/cart/cart.context";
import { CheckcOutCart, CreateAddress, Payment } from "src/api/routs";
import Cookies from "js-cookie";
import { useLanguageCode } from "@utils/useTranslation";
import SelectInput from "@components/ui/customSelect";
import { methodDelivery } from "@settings/method-delivery";
import { useUI } from "@contexts/ui.context";
import { CouponStore } from "src/store/coupon";
import { toast, ToastContainer } from "react-toastify";
import Script from "next/script";

interface CheckoutProps {
  address: Address[];
  cities: City[];
}

const CheckoutForm: React.FC<CheckoutProps> = ({ address, cities }) => {
  let responsePayment;
  const { t } = useTranslation();
  const lang = useLanguageCode();
  const userId = Cookies.get("userId");
  const { setModalView, openModal } = useUI();
  const [coupon, setCoupon] = useState<string>("0");
  const deliveryFees = cityStore((state) => state.items.Value);
  const [isClient, setIsClient] = useState(false);
  const [showAcvtive, setShowActive] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const { items, total } = useCart();
  const [payment, setPayment] = useState<any>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    address?.length ? address[address.length - 1] : null
  );

  const defaultValues = {
    name: selectedAddress?.name || "",
    address: selectedAddress?.address1 || "",
    country: selectedAddress?.country || "",
    city: selectedAddress?.city || "",
    phone: selectedAddress?.phone1 || "",
    postal: selectedAddress?.postal || "",
  };

  const success = () =>
    toast.success(t("common:order-success"), {
      position: "top-right",
      className: "!bg-white",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAndUpdateAddress>({ defaultValues });

  useEffect(() => {
    if (address && address.length > 0) {
      setSelectedAddress(address[address.length - 1]);
    }
  }, [address]);

  useEffect(() => {
    if (selectedAddress) {
      reset(defaultValues);
      handleSelectCity(selectedAddress.city);
    }
  }, [selectedAddress, reset]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const coupon = CouponStore.getState().coupon;
    setCoupon(coupon);
    CouponStore.getState().clearCoupon();
  }, [CouponStore.getState().coupon]);

  const productsJson = createProductsJson(items);
  const totalAll = total + Number(deliveryFees) - Number(coupon);

  async function onSubmit(input: CreateAndUpdateAddress) {
    if (selectedAddress && userId) {
      0;
      const createOrder = await CheckcOutCart(
        userId,
        productsJson,
        selectedAddress.Id,
        totalAll,
        coupon,
        lang,
        Number(input.methodDelivery)
      );

      if (createOrder) {
        success();
        if (input.methodDelivery == "2") {
          responsePayment = await Payment(
            createOrder.OrderID,
            userId,
            lang,
            "0"
          );
          setPayment(responsePayment);
          setOrderId(createOrder.OrderID);
          setShowActive(showAcvtive + 1);
        } else {
          Router.push(ROUTES.ORDER + "?order=" + createOrder.OrderID);
        }
      }
    } else {
      const craeteAddress = await CreateAddress(userId, input, lang);

      if (craeteAddress.success == 1) {
        const createOrder = await CheckcOutCart(
          userId,
          productsJson,
          craeteAddress.AddressId,
          totalAll,
          coupon,
          lang,
          Number(input.methodDelivery)
        );
        if (createOrder) {
          success();
          if (input.methodDelivery == "2") {
            responsePayment = await Payment(
              createOrder.OrderID,
              userId,
              lang,
              "0"
            );
            setPayment(responsePayment);
            setOrderId(createOrder.OrderID);
            setShowActive(showAcvtive + 1);
          } else {
            Router.push(ROUTES.ORDER + "?order=" + createOrder.OrderID);
          }
        }
      }
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const addressObj = address.find((addr) => addr.Id === selectedId);
    if (addressObj) {
      setSelectedAddress(addressObj);
    }
  };

  const handelNewAddress = () => {
    reset({
      name: "",
      address: "",
      country: "",
      city: "",
      phone: "",
      postal: "",
    });
    setSelectedAddress(null);
  };

  function handleSelectCity(cityId: string) {
    const selectedCity = cities.find((city) => city.ID == cityId);
    if (selectedCity) {
      cityStore.getState().addItem(selectedCity);
    }
  }

  return isClient ? (
    <>
      {showAcvtive == 0 && (
        <>
          <div className="flex justify-between">
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
              {t("text-shipping-address")}
            </h2>
            <div className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8 flex items-center  w-full md:w-72">
              <select
                name="address"
                className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border  text-xs lg:text-sm  placeholder-body min-h-12  bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md !text-gray-700 "
                onChange={handleAddressChange}
              >
                {errors.city?.message}
                <option value="">{t("common:select-label")}</option>
                {address?.map((city) => (
                  <option key={city.Id} value={city?.Id}>
                    {city?.address2}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mx-auto flex flex-col justify-center "
            noValidate
          >
            <div className="flex flex-col space-y-4 lg:space-y-5">
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                <Input
                  labelKey="forms:label-first-name"
                  {...register("name", {
                    required: "forms:first-name-required",
                  })}
                  errorKey={errors?.name?.message}
                  variant="solid"
                  className="w-full lg:w-1/2 "
                />
                <Input
                  type="tel"
                  labelKey="forms:label-phone"
                  {...register("phone", {
                    required: "forms:phone-required",
                  })}
                  errorKey={errors?.phone?.message}
                  variant="solid"
                  className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
                />
              </div>
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                <Input
                  labelKey="forms:label-address"
                  {...register("address", {
                    required: "forms:address-required",
                  })}
                  errorKey={errors?.address?.message}
                  variant="solid"
                  className="w-full lg:w-1/2 "
                />
                <Input
                  type="tel"
                  labelKey="forms:label-country"
                  {...register("country", {
                    required: "forms:phone-required",
                  })}
                  errorKey={errors?.phone?.message}
                  variant="solid"
                  className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
                />
              </div>
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                <SelectInput
                  title="Select City"
                  labelKey={t("forms:label-city")}
                  options={cities}
                  register={register}
                  name="city"
                  validation={{ required: t("forms:city-required") }}
                  error={errors?.city?.message}
                  onChange={handleSelectCity}
                  className="lg:w-1/2"
                />

                <SelectInput
                  title="method-label"
                  labelKey={t("forms:method-label")}
                  options={methodDelivery}
                  register={register}
                  name="methodDelivery"
                  validation={{ required: t("forms:methodDelivery-required") }}
                  error={errors.methodDelivery?.message}
                  className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
                />
              </div>

              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                <div className="flex w-full gap-1 ">
                  <Button
                    className="w-full sm:w-auto"
                    disabled={items.length == 0 ? true : false}
                  >
                    {t("common:button-place-order")}
                  </Button>
                  <Button
                    type="button"
                    className="w-full sm:w-auto "
                    onClick={handelNewAddress}
                  >
                    {t("common:button-new-address")}
                  </Button>
                  <Button
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setModalView("COUPON_VIEW");
                      openModal();
                    }}
                  >
                    {t("forms:coupon")}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
      {showAcvtive == 1 && (
        <div className="w-full mt-10">
          <Script
            src={`${payment.BaseUrl}/v1/paymentWidgets.js?checkoutId=${payment?.CheckoutResponse?.id}`}
            integrity="{integrity}"
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
          <form
            action={`https://production.vikikfashion.com/confirmPayment?OrderId=${orderId}`}
            className="paymentWidgets"
            data-brands="VISA"
          ></form>
        </div>
      )}

      <ToastContainer />
    </>
  ) : (
    ""
  );
};

export default CheckoutForm;
