import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
import { useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { CheckCoupon } from "src/api/routs/Coupon";
import Logo from "@components/ui/logo";
import { CouponStore } from "src/store/coupon";

type couponFormValues = {
  coupon: string;
};

const defaultValues = {
  coupon: "",
};

const CouponForm = () => {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const { closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<couponFormValues>({
    defaultValues,
  });

  const onSubmit = async ({ coupon }: couponFormValues) => {
    setLoad(true);
    const result = await CheckCoupon(Cookies.get("userId"), coupon);
    CouponStore.getState().addCoupon(result);
    setLoad(false);
  };
  return (
    <div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-9 pt-2.5">
        {/* <div onClick={closeModal}> */}
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
          {t("forms:coupon-label")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          labelKey="forms:coupon-enter"
          type="tel"
          variant="solid"
          {...register("coupon", {
            required: `${t("forms:coupon-required")}`,
          })}
          errorKey={errors.coupon?.message}
        />

        <Button
          type="submit"
          className="h-11 md:h-12 w-full mt-2 hover:bg-primary-800"
        >
          {load ? (
            <ThreeDot color="#ffffff" size="small" />
          ) : (
            t("forms:confirm")
          )}
        </Button>
      </form>
    </div>
  );
};

export default CouponForm;
