import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";
import isEmpty from "lodash/isEmpty";
import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
interface Props {
  itemKey: string;
  itemValue: string;
}

export const FilteredItem = ({ itemKey, itemValue }: Props) => {
  const router = useRouter();
  const { pathname, query } = router;
  const queryClient = useQueryClient();
  const category = queryClient.getQueryData(["category1"]);
  const color = queryClient.getQueryData(["colors"]);
  const size = queryClient.getQueryData(["size"]);
  const subCategories = queryClient.getQueryData([
    `subcategory`,
    query.category
  ]);
  
  function handleClose() {
    const currentItem = (query[itemKey]! as string)
      ?.split(",")
      ?.filter((i) => i !== itemValue);
    delete query[itemKey];
    router.push({
      pathname,
      query: {
        ...query,
        ...(!isEmpty(currentItem) ? { [itemKey]: currentItem.join(",") } : {}),
      },
    });
  }

  function getNameById(id: string, key: string): string {
    let dataSource: any | undefined;
    if (key == "category" && subCategories) {
           dataSource = subCategories;
    } else {
           dataSource = category;
    }
    if (key === "color") dataSource = color;
    if (key === "size") dataSource = size;
    const matchedItem = dataSource?.find((item: any) => (item.id || item.Id) == id);
    return matchedItem?.name || matchedItem?.label;
  }

  const displayName = getNameById(itemValue, itemKey);

  return (
 <>
    <div
      className="flex flex-shrink-0 items-center border border-gray-300 rounded-lg text-xs px-3.5 py-2.5 cursor-pointer transition duration-200 ease-in-out hover:border-heading"
      onClick={handleClose}
    >
      {displayName}
      <IoClose className="text-sm text-body ltr:ml-2 rtl:mr-2 flex-shrink-0 ltr:-mr-0.5 rtl:-ml-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
   
     </div>
    <ReactQueryDevtools />
 </>
  );
};
