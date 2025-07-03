import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Logo from "@components/ui/logo";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { OTPVerify } from "src/api/routs";
import { useLanguageCode } from "@utils/useTranslation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useState } from "react";
import { ThreeDot } from "react-loading-indicators";

type OTPFormValues = {
  OTP: string;
};

const defaultValues = {
  OTP: "",
};

const EmailOTPForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const { setModalView, openModal, closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    defaultValues,
  });
  const lang = useLanguageCode();

  const onSubmit = async ({ OTP }: { OTP: string }) => {
    setLoad(true);
    console.log(OTP)
  };
  return (
    <div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-9 pt-2.5">
        {/* <div onClick={closeModal}> */}
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
          {t("forms:otp-msg")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          labelKey="forms:label-otp"
          type="tel" // Use type "tel" for otp numbers
          variant="solid"
          {...register("OTP", {
            required: `${t("forms:otp-required")}`,
            pattern: {
              value: /^\d{4}$/,
              message: t("forms:otp-error"),
            },
            maxLength: {
              value: 5,
              message: t("forms:otp-length-error"),
            },
          })}
          errorKey={errors.OTP?.message}
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
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-white">
          {t("common:text-or")}
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        {/* {t("common:text-back")}{" "} */}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={() => {
            setModalView("LOGIN_VIEW");
          }}
        >
          {t("common:text-back-to")}
        </button>
      </div>
    </div>
  );
};

export default EmailOTPForm;
