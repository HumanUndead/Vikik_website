import Button from "@components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import { ILoginData } from "src/api/type";
import { useLanguageCode } from "@utils/useTranslation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LoginAccount } from "src/api/routs";
import Cookies from "js-cookie";
import { useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { CloudCog } from "lucide-react";
const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { setModalView, closeModal } = useUI();
  const lang = useLanguageCode();
  const [load, setLoad] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginData>();

  async function onSubmit({ phone }: { phone: string }) {
    const fullPhoneNumber = `00${phone}`;
    setLoad(true);
    const login = await LoginAccount(fullPhoneNumber, String(lang));
     if (login.Success === '1') {
      setLoad(false);
      Cookies.set("UserNotFound", login.UserNotFound);
      Cookies.set("UserId", login.userId);
      Cookies.set("phone", fullPhoneNumber);
      setModalView("OTP_VIEW");
    }
    setLoad(false);
  }

  return (
    <div className="w-full px-5 py-5 mx-auto overflow-hidden bg-white border border-gray-300 rounded-lg sm:w-96 md:w-450px sm:px-8">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="mt-2 mb-8 text-sm md:text-base text-body sm:mb-10">
          {t("common:login-helper")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-3.5">
          <p>{t("forms:label-phone")}</p>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: `${t("forms:phone-required")}`,
              pattern: {
                value: /^\+?[1-9]\d{7,14}$/,
                message: t("forms:phone-error"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country={"jo"}
                value={value}
                onChange={onChange}
                inputProps={{
                  required: true,
                  autoFocus: true,
                }}
                inputStyle={{ width: "100%", height: "40px" }}
                placeholder={t("forms:label-phone")}
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
          <div className="flex items-center justify-center"></div>
          <div className="relative">
            <Button type="submit" className="h-11 md:h-12 w-full mt-1.5">
              {load ? (
                <ThreeDot color="#ffffff" size="small" />
              ) : (
                t("common:text-login")
              )}
            </Button>
          </div>
        </div>
      </form>
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
        <hr className="" />
      </div>
    </div>
  );
};

export default LoginForm;
