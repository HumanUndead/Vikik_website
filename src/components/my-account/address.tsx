import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "next-i18next";
import { Address, City, CreateAndUpdateAddress } from "src/api/type";
import { CreateAddress } from "src/api/routs";
import Cookies from "js-cookie";
import { useLanguageCode } from "@utils/useTranslation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface addressProps {
  address: Address[];
  cities: City[];
}

const AddressUser: React.FC<addressProps> = ({ address, cities }) => {
  const lang = useLanguageCode();
  const { t } = useTranslation();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    address?.length ? address[address.length - 1] : null
  );
  useEffect(() => {
    if (address && address.length > 0) {
      setSelectedAddress(address[address.length - 1]);
    }
  }, [address]);

  const defaultValues = {
    name: selectedAddress?.name || "",
    address: selectedAddress?.address1 || "",
    country: selectedAddress?.country || "",
    city: selectedAddress?.city || "",
    phone: selectedAddress?.phone1 || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAndUpdateAddress>({
    defaultValues,
  });

  const notify = () =>
    toast.success(t("common:update-success"), {
      position: "top-right",
      className: "!bg-white",
    });

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const addressObj = address.find((addr) => addr.Id === selectedId);
    if (addressObj) {
      setSelectedAddress(addressObj);
    }
  };

  async function onSubmit(input: CreateAndUpdateAddress) {
    const createAddress = await CreateAddress(
      Cookies.get("userId"),
      input,
      lang
    );
    if (createAddress.success == "1") {
      notify();
    }
  }

  const handelNewAddress = () => {
    reset({
      name: "",
      address: "",
      country: "",
      city: "",
      phone: "",
    });
    setSelectedAddress(null);
  };

  useEffect(() => {
    if (selectedAddress) {
      reset(defaultValues);
    }
  }, [selectedAddress, reset]);

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      //@ts-ignore
      variants={fadeInTop(0.35)}
      className={`w-full flex flex-col`}
    >
      <div className="flex justify-between w-full">
        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
          {t("common:text-account-details")}
        </h2>
        <div className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8 flex items-center  w-full md:w-72">
          <select
            name="address"
            className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12  bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md !text-gray-700"
            onChange={handleAddressChange}
          >
            {errors.city?.message}
            <option value="">{t("common:select-label")}</option>
            {address.map((city) => (
              <option key={city.Id} value={city.Id}>
                {city.address2}
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
        <div className="flex flex-col space-y-4 sm:space-y-5">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              labelKey="forms:label-phone"
              {...register("phone", {
                required: "forms:phone-required",
                pattern: {
                  value:
                    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,6}$/im,
                  message: "forms:phone-invalid",
                },
              })}
              variant="solid"
              errorKey={errors.phone?.message}
            />

            {/* Address Section */}

            <Input
              labelKey="forms:label-address"
              {...register("address", {
                required: "forms:address-required",
              })}
              variant="solid"
              errorKey={errors.address?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              labelKey="forms:label-name"
              {...register("name", {
                required: "forms:name-required",
              })}
              variant="solid"
              errorKey={errors?.name?.message}
            />

            <div className="block w-full">
              <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                {t("forms:label-country")}
              </label>
              <select
                {...register("country", {
                  required: "forms:country-required",
                })}
                className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md !text-gray-700"
              >
                <option value="" disabled hidden>
                  {t("common:select-label")}
                </option>
                <option value="Jordan">{t("common:Jordan")}</option>
              </select>
              {errors?.country?.message && (
                <span className="text-red-500 text-xs">
                  {t(errors.country.message)}
                </span>
              )}
            </div>

            <div className="block w-full">
              <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                {t("forms:label-city")}
              </label>
              <select
                {...register("city", {
                  required: "forms:city-required",
                })}
                className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12  bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md !text-gray-700"
              >
                {errors.city?.message}
                <option value="" disabled hidden>
                  {t("common:select-label")}
                </option>
                {cities.map((city) => (
                  <option key={city.ID} value={city.ID}>
                    {city?.Name}
                  </option>
                ))}
              </select>
              {errors?.city?.message && (
                <span className="text-red-500 text-xs">
                  {t(errors.city.message)}
                </span>
              )}
            </div>
          </div>

          <div className="relative flex gap-3">
            <Button type="submit" className="h-12 mt-3 w-full sm:w-32">
              {t("common:button-save")}
            </Button>

            <Button
              type="button"
              className="h-12 mt-3 w-full sm:w-32"
              onClick={handelNewAddress}
            >
              {t("common:button-new-address")}
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </motion.div>
  );
};

export default AddressUser;
