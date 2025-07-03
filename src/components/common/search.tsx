import React, { useRef, useEffect, useState } from "react";
import cn from "classnames";
import SearchResultLoader from "@components/ui/loaders/search-result-loader";
import { useUI } from "@contexts/ui.context";
import SearchBox from "@components/common/search-box";

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import Scrollbar from "@components/common/scrollbar";
import SearchProduct from "@components/common/search-product";
import { SearchData } from "src/api/type";
import SearchApi from "src/api/routs/Search";
import { useLanguageCode } from "@utils/useTranslation";

function useDebounce(value: string | undefined, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function Search() {
  const { displaySearch, closeSearch } = useUI();
  const [searchText, setSearchText] = React.useState("");
  const [data, setDataSearch] = useState<SearchData[]>([]);
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const lang = useLanguageCode();

  const handelChange = async (data: string) => {
    if (!data.trim()) return;
    const dataSearch_data = await SearchApi(data, lang);
    setDataSearch(dataSearch_data);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      handelChange(debouncedSearchTerm);
    } else {
      setDataSearch([]);
    }
  }, [debouncedSearchTerm]);

  function clear() {
    setSearchText("");
  }

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (displaySearch) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [displaySearch]);

  return (
    <div ref={ref}>
      <div
        className={cn("overlay", {
          open: displaySearch,
        })}
        role="button"
        onClick={closeSearch}
      />
      <div
        className={cn(
          "drawer-search relative hidden top-0 z-30 opacity-0 invisible transition duration-300 ease-in-out left-1/2 px-4 w-full md:w-[730px] lg:w-[930px]",
          {
            open: displaySearch,
          }
        )}
      >
        <div className="w-full flex flex-col justify-center">
          <div className="flex-shrink-0 mt-3.5 lg:mt-4 w-full">
            <div className="flex flex-col mx-auto mb-1.5 w-full ">
              <SearchBox
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                name="search"
                value={searchText}
                onClear={clear}
                ref={inputRef}
              />
            </div>
            {searchText && (
              <div className="bg-white flex flex-col rounded-md overflow-hidden h-full max-h-64vh lg:max-h-[550px]">
                <Scrollbar className="os-host-flexbox">
                  <div className="h-full">
                    {data.length >= 0 ? (
                      data?.map((item: any, index: number) => (
                        <div
                          key={item.key}
                          className=" p-5 border-b border-gray-150 relative last:border-b-0"
                          onClick={closeSearch}
                        >
                          <SearchProduct item={item} key={index} />
                        </div>
                      ))
                    ) : (
                      <div className="p-5 border-b border-gray-300 border-opacity-30 last:border-b-0">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <SearchResultLoader
                            key={idx}
                            uniqueKey={`top-search-${idx}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Scrollbar>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
