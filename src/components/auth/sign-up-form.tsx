import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { Controller, useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { UpdateUserType } from "src/api/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import Cookies from "js-cookie";
import { UpdateUserInf } from "src/api/routs";
import { useLanguageCode } from "@utils/useTranslation";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { setModalView, openModal, closeModal } = useUI();
  const lang = useLanguageCode();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>();

  function handleSignIn() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  async function onSubmit({ name, email, gender, DOB }: UpdateUserType) {
    const update = await UpdateUserInf(
      Cookies.get("UserId") || "",
      name,
      gender,
      DOB || "",
      email,
      lang,
      true
    );
    if (update.success && update.emailFound == false) {
      closeModal();
      Cookies.remove("UserId");
      Cookies.remove("UserNotFound");
      Cookies.set("userId", update.user.uid);
      router.push(ROUTES.HOME);
    } else {
      setModalView("EMAIL_OTP_VIEW");
      openModal();
    }
  }

  const handelCloseModel = () => {
    closeModal();
  };

  return (
    <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-6 pt-2.5">
        <div onClick={() => handelCloseModel}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
          {t("common:registration-helper")}
          <Link
            href={ROUTES.TERMS}
            className="text-heading underline hover:no-underline focus:outline-none"
          >
            {t("common:text-terms")}
          </Link>{" "}
          &amp;{" "}
          <Link
            href={ROUTES.POLICY}
            className="text-heading underline hover:no-underline focus:outline-none"
          >
            {t("common:text-policy")}
          </Link>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-4">
          <Input
            labelKey="forms:label-name"
            type="text"
            variant="solid"
            {...register("name", {
              required: "forms:name-required",
            })}
            errorKey={errors?.name?.message}
          />

          <div>
            <p className="!mb-[0.75rem] font-[600] leading-none text-sm">
              {t("forms:gender")}
            </p>
            <Controller
              name="gender"
              control={control}
              rules={{ required: `${t("forms:gender-required")}` }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="2">{t("forms:female")}</SelectItem>
                      <SelectItem value="1">{t("forms:male")}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div className="mb-4 w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("forms:birthDay")}
            </label>
            <Controller
              name="DOB"
              control={control}
              rules={{
                required: t("forms:date-required"),
              }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date?.toISOString().split("T")[0])
                  }
                  dateFormat="yyyy-MM-dd"
                  placeholderText="YYYY-MM-DD"
                  className="!w-full py-2 px-4 md:px-5 appearance-none  border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md !text-gray-700"
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                />
              )}
            />
          </div>

          <Input
            labelKey="forms:label-email"
            type="email"
            variant="solid"
            {...register("email", {
              required: `${t("forms:email-required")}`,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: t("forms:email-error"),
              },
            })}
            errorKey={errors.email?.message}
          />

          <div className="relative">
            <Button type="submit" className="h-11 md:h-12 w-full mt-2">
              {t("common:text-register")}
            </Button>
          </div>
        </div>
      </form>
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-white">
          {t("common:text-or")}
        </span>
      </div>

      <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
        {t("common:text-have-account")}{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {t("common:text-login")}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
