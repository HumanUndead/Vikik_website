import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { GetColors } from "src/api/routs";
import { useLanguageCode } from "@utils/useTranslation";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/accordion";
export const ColorFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const lang = useLanguageCode();
  const { data } = useQuery({
    queryKey: ["colors"],
    queryFn: () => GetColors(lang),
    staleTime: Infinity,
  });

  const selectedColors = query?.color ? (query.color as string).split(",") : [];

  const [formState, setFormState] = React.useState<string[]>(selectedColors);
  React.useEffect(() => {
    setFormState(selectedColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.color]);
  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    setFormState(currentFormState);

    const { color, ...restQuery } = query;

    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length ? { color: value } : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <Accordion type="multiple">
      <AccordionItem value="main">
        <div className="block border-b border-gray-300 pb-7">
          <div className="text-heading text-sm md:text-base font-semibold  flex justify-between">
            {t("text-colors")}
            <AccordionTrigger className="w-6 h-6 p-1 ml-auto" />
          </div>
          <AccordionContent>
            <div className="mt-2 flex flex-col space-y-4">
              {data?.map((item: any) => {
                return (
                  <CheckBox
                    key={item.id}
                    label={
                      <span className="flex items-center">
                        <span
                          className={`w-5 h-5 rounded-full block ltr:mr-3 rtl:ml-3 mt-0.5 border border-black border-opacity-20`}
                          style={{ backgroundColor: item.value }}
                        />
                        {item.label}
                      </span>
                    }
                    name={item.label.toLowerCase()}
                    checked={formState.includes(item.id.toString())}
                    value={item.id}
                    onChange={handleItemClick}
                  />
                );
              })}
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
};
