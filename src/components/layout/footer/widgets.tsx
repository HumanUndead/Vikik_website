import Container from "@components/ui/container";
import WidgetLink from "@components/widgets/widget-link";
import { useQuery } from "@tanstack/react-query";
import { useLanguageCode } from "@utils/useTranslation";
import cn from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GetPages } from "src/api/routs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/accordion";
interface WidgetsProps {
  widgets: {
    id: number;
    widgetTitle?: string;
    lists: any;
    isCompanyIntroduction?: boolean;
    logo?: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({ widgets }) => {
  const { t } = useTranslation("footer");
  const [isClient, setIsClient] = useState(false);
  const lang = useLanguageCode();
  const { data } = useQuery({
    queryKey: ["WorkUs", lang],
    queryFn: () => GetPages("10014", lang),
  });

  const stripHtmlTags = (html: string | undefined): string => {
    if (!html) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <Container>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 md:gap-9 xl:gap-5  justify-start items-center pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1 mx-auto "
        )}
      >
        {widgets?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="pb-3 md:pb-0 flex flex-col justify-start items-center h-full "
            variant="contemporary"
          />
        ))}
        <div className=" w-full  overflow-hidden h-[224px] ">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{data?.Label}</AccordionTrigger>
              <AccordionContent>
                {stripHtmlTags(data?.Text)}
                <span className=" ml-2 underline ">
                  <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeLaAKFRGr5CTdLe4M8WKarwoUF1LLxe3SFa2PqbojxFYeimw/viewform">
                    {t("click")}
                  </Link>
                </span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Container>
  ) : (
    ""
  );
};

export default Widgets;
