import React, { useState } from "react";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { heightCollapse } from "@utils/motion/height-collapse";
import { useTranslation } from "next-i18next";

type CollapseProps = {
  i: number;
  title?: string;
  content?: any;
  expanded: number;
  translatorNS: string;
  setExpanded: any;
  variant?: "gray" | "transparent";
};

export const Collapse: React.FC<CollapseProps> = ({
  i,
  expanded,
  setExpanded,
  title,
  content,
  translatorNS,
  variant = "gray",
}) => {
  const isOpen = i === expanded;
  console.log(content);

  const { t } = useTranslation(translatorNS);
  return (
    <div
      className={cn({
        "rounded-md bg-gray-200": variant === "gray",
        "shadow-sm": isOpen,
      })}
    >
      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        className={cn(
          "cursor-pointer flex items-center justify-between transition-colors py-5 md:py-6",
          {
            "px-6 md:px-8 lg:px-10": variant === "gray",
            "border-t border-gray-300": variant === "transparent",
          }
        )}
      >
        <h2
          className={cn(
            "text-sm font-semibold leading-relaxed text-heading ltr:pr-2 rtl:pl-2",
            {
              "md:text-base": variant === "gray",
              "md:text-base lg:text-lg": variant === "transparent",
            }
          )}
        >
          {title}
        </h2>
        <div className="relative flex items-center justify-center flex-shrink-0 w-4 h-4">
          <div className="w-full h-0.5 bg-heading rounded-sm" />
          <div
            className={`origin-bottom transform w-0.5 h-full bg-heading rounded-sm absolute bottom-0 transition-transform duration-500 ease-in-out ${
              isOpen ? "scale-0" : "scale-100"
            }`}
          />
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="from"
            animate="to"
            exit="from"
            variants={heightCollapse()}
          >
            <div
              className={cn("pb-6 md:pb-1 text-gray-600  border-b", {
                "pt-5 border-t border-gray-200 px-6 md:px-8 lg:px-10":
                  variant === "gray",
              })}
            >
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <span className="text-sm font-medium text-gray-500">
                      {content.UserName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {content.UserName}
                  </h4>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          filled={star <= content.Rating}
                          className="w-4 h-4"
                        />
                      ))}
                    </div>{" "}
                    <span className="ml-1 text-xs text-gray-600">
                      {content.Rating}/5
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="text-lg  text-gray-700 leading-relaxed ml-1">
                    {content.Review}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function StarIcon({ filled, className }) {
  return (
    <svg
      className={cn(className, filled ? "text-yellow-400" : "text-gray-300")}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
