import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import "react-datepicker/dist/react-datepicker.css";
import { RadioBox } from "@components/ui/radiobox";
import { useTranslation } from "next-i18next";
import { UpdateUserType, User } from "src/api/type";
import { UpdateUserInf } from "src/api/routs";
import DatePicker from "react-datepicker";
import Cookies from "js-cookie";
import { useLanguageCode } from "@utils/useTranslation";
import { ToastContainer, toast } from "react-toastify";

interface accountProps {
  account: User;
}

const AccountDetails: React.FC<accountProps> = ({ account }) => {
  const defaultValues = {
    name: account?.Name || "",
    email: account?.Email || "",
    DOB: account?.DOB ? new Date(account.DOB).toISOString().split("T")[0] : "",
    gender: account?.Gender || "",
  };

  const lang = useLanguageCode();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });

  const notify = () =>
    toast.success(t("common:update-success"), {
      position: "top-right",
      className: "!bg-white",
    });

  async function onSubmit(input: UpdateUserType) {
    const data = await UpdateUserInf(
      Cookies.get("userId"),
      input.name as string,
      input.gender,
      input.DOB,
      input.email as string,
      lang,
      false
    );
    if (data.success == 1) {
      notify();
    }
  }

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
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("common:text-account-details")}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 sm:space-y-5">
          <Input
            labelKey="forms:label-name"
            {...register("name", {
              required: "forms:first-name-required",
            })}
            variant="solid"
            className="w-full sm:w-1/2"
            errorKey={errors?.name?.message}
          />
          <Input
            labelKey="forms:label-email"
            {...register("email", {
              required: "forms:last-name-required",
            })}
            variant="solid"
            className="w-full sm:w-1/2"
            errorKey={errors?.email?.message}
          />

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
          <div className="relative flex flex-col">
            <span className="mt-2 text-sm text-heading font-semibold block pb-1">
              {t("common:text-gender")}
            </span>
            <div className="mt-2 flex items-center gap-x-6">
              <RadioBox
                labelKey="forms:label-male"
                {...register("gender")}
                value="2"
                checked={watch("gender") == "2"}
              />
              <RadioBox
                labelKey="forms:label-female"
                {...register("gender")}
                value="1"
                checked={watch("gender") == "1"}
              />
            </div>
          </div>
          <div className="relative">
            <Button type="submit" className="h-12 mt-3 w-full sm:w-32">
              {t("common:button-save")}
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </motion.div>
  );
};

export default AccountDetails;
