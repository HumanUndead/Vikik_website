import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { GetSizes } from "src/api/routs";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/accordion";
export const SizeFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;

  const { data } = useQuery({
    queryKey: ["size"],
    queryFn: () => GetSizes(),
    staleTime: Infinity,
  });

  const selectedBrands = query?.size ? (query.size as string).split(",") : [];
  const [formState, setFormState] = React.useState<string[]>(selectedBrands);
  React.useEffect(() => {
    setFormState(selectedBrands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.size]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;

    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    // setFormState(currentFormState);
    const { size, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length ? { size: value } : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <Accordion type="multiple">
      <AccordionItem value="main">
        <div className="block border-b border-gray-300 pb-7 mb-7">
          <div className="text-heading text-sm md:text-base font-semibold  flex justify-between">
            {t("text-size")}
            <AccordionTrigger className="w-6 h-6 p-1 ml-auto" />
          </div>
          <AccordionContent>
            <div className="mt-2 flex flex-col space-y-4">
              {data?.map((item: any) => (
                <CheckBox
                  key={item.id}
                  label={item.label}
                  name={item.label.toLowerCase()}
                  checked={formState.includes(item.id.toString())}
                  value={item.id}
                  onChange={handleItemClick}
                />
              ))}
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
};
