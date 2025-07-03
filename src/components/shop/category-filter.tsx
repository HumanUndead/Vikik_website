import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useLanguageCode } from "@utils/useTranslation";
import { GetCategory, GetCategory1, GetSubCategory } from "src/api/routs";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/accordion";
export const CategoryFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const lang = useLanguageCode();
  const [subcategory, setSubCategory] = React.useState<any[]>();

  const { data: categories } = useQuery({
    queryKey: ["category1"],
    queryFn: () => GetCategory1(lang),
    staleTime: Infinity,
  });

  const selectedCategories = query?.category
    ? (query.category as string).split(",")
    : [];

  const [formState, setFormState] = useState<string[]>(selectedCategories);

  useEffect(() => {
    setFormState(selectedCategories);
  }, [query?.category]);

  const selectedCategoryWithChildren = categories?.find(
    (cat: any) => cat.haschildren == 1 && selectedCategories.includes(cat.Id)
  );

  const { data: subCategories } = useQuery({
    queryKey: ["subcategory", selectedCategoryWithChildren?.Id],
    queryFn: () =>
      selectedCategoryWithChildren &&
      GetSubCategory(selectedCategoryWithChildren.Id, lang),
    enabled: !!selectedCategoryWithChildren,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (subCategories) {
      setSubCategory(subCategories);
    }
  }, [subCategories]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const { page, category, ...restQuery } = query;

    router.replace(
      {
        pathname,
        query: {
          ...restQuery,
          page: 1,
          category: value,
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <Accordion type="multiple" defaultValue={["main"]}>
      <AccordionItem value="main">
        <div className="block border-b border-gray-300 pb-7 mb-7">
          <div className="text-heading text-sm md:text-base font-semibold  flex justify-between">
            {t("text-category")}
            <AccordionTrigger className="w-6 h-6 p-1 ml-auto" />
          </div>

          <AccordionContent>
            <div className="mt-2 flex flex-col space-y-4">
              {categories?.map((item: any) => (
                <React.Fragment key={item.Id}>
                  <CheckBox
                    label={item?.name}
                    name={item?.name?.toLowerCase()}
                    checked={formState.includes(item.Id)}
                    value={item.Id}
                    onChange={handleItemClick}
                  />

                  {item.haschildren == 1 &&
                    subcategory?.length > 0 &&
                    item.Id == subcategory[0]?.parentid && (
                      <div className="ml-4">
                        {subcategory?.map((subItem: any) => (
                          <div className="mt-2">
                            <CheckBox
                              key={subItem.Id}
                              label={subItem?.name}
                              name={subItem?.name.toLowerCase()}
                              checked={formState.includes(subItem?.Id)}
                              value={subItem?.Id}
                              onChange={handleItemClick}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                </React.Fragment>
              ))}
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
};
