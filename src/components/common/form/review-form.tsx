import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import ReactStars from "react-rating-stars-component";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { ProductReviewAdd } from "src/api/routs";
import Cookies from "js-cookie";

interface ReviewFormProp {
  productId: number;
}

interface ReviewFormValues {
  message: string;
}

const ReviewForm: React.FC<ReviewFormProp> = ({ productId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>();

  const [rating, srtRating] = useState(0);
  const ratingChanged = (newRating: any) => {
    srtRating(newRating);
  };

  async function onSubmit(values: ReviewFormValues) {
    await ProductReviewAdd(
      Cookies.get("userId"),
      String(productId),
      values.message,
      rating
    );
  }
  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto flex flex-col justify-center mt-6 lg:mt-8"
      noValidate
    >
      <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
        <div>
          <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
            {t("forms:label-your-rating")}
          </label>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={20}
            color="#c6c6c6"
            activeColor="#202020"
            half={false}
          />
        </div>
        <TextArea
          labelKey="forms:label-message-star"
          {...register("message", { required: "Message is required" })}
          errorKey={errors.message?.message}
        />

        <div className="pt-1">
          <Button
            type="submit"
            className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
          >
            {t("common:button-submit")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
