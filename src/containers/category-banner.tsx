import Image from "next/image";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
interface CategoryBannerProps {
  className?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  className = "mb-7",
}) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const {
    query: { slug },
  } = useRouter();
  const categoryTitle = slug?.toString().split("&")[0];
  const categoryId = slug?.toString().split("&")[1];

  const content = "content/categoriesIcon";
  //vikikfashion.com/content/categoriesIcon/70431.png
  https: return (
    <div
      className={`bg-gray-200 rounded-md relative flex flex-row ${className}`}
    >
      <div className="hidden md:flex w-[1800px] h-[570px]">
        <Image
          src={
            categoryId
              ? process.env.NEXT_PUBLIC_BASE_API_URL +
                content +
                "/" +
                categoryId +
                ".png"
              : "/assets/images/category-banner.jpg"
          }
          alt="Category Banner"
          width={1800}
          height={570}
          className="rounded-md object-cover object-top "
          unoptimized
        />
      </div>

      {/* <div className="relative md:absolute top-0 ltr:left-0 rtl:right-0 h-auto md:h-full w-full md:w-2/5 flex items-center py-2 sm:py-3.5">
        <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-heading p-7 text-center w-full">
          #{categoryTitle}
        </h2>
      </div> */}
    </div>
  );
};

export default CategoryBanner;
