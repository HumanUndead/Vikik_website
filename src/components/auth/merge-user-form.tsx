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
import { MergeUser } from "src/api/routs";

type OTPFormValues = {
  OTP: string;
};

const defaultValues = {
  OTP: "",
};

const MergeUserForm = () => {
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

  const onSubmit = async () => {
    
    const result = await MergeUser("" , Cookies.get("UserId") || "")
    if(result.success === 1){
      closeModal();
      router.push(ROUTES.HOME);
    }else{
      console.log(result.message);
    }
  };

  return (
    <div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-9 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base font-semibold mt-3 sm:mt-4 mb-8 sm:mb-10">
        {t("forms:merge-account-message")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex gap-4">
          <Button
            type="button"
            className="flex-1 h-11 md:h-12 hover:bg-primary-800"
            onClick={() => closeModal()}
          >
            {load ? (
              <ThreeDot color="#ffffff" size="small" />
            ) : (
              t("forms:cancel")
            )}
         
          </Button>
          <Button
            type="submit"
            className="flex-1 h-11 md:h-12 hover:bg-primary-800"
           
          >
            {load ? (
              <ThreeDot color="#ffffff" size="small" />
            ) : (
              t("forms:merge")
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MergeUserForm;
