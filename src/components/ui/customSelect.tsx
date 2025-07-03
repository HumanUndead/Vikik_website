// components/SelectInput.tsx

import React from "react";
import { useTranslation } from "react-i18next";

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  labelKey: string;
  options: any[];
  error?: string;
  register: any;
  name: string;
  validation?: object;
  className?: string;
  onChange?: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  title,
  labelKey,
  options,
  error,
  register,
  name,
  validation = {},
  className = "",
  onChange,
  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
        {labelKey}
      </label>
      <select
        {...register(name, validation)}
        onChange={(e) => {
          register(name, validation).onChange(e);
          onChange?.(e.target.value);
        }}
        className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border  text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md text-gray-700"
        {...rest}
      >
        <option value="">{t(`${title}`)}</option>
        {options.map((city) => (
          <option key={city?.ID} value={city?.ID}>
            {t(city?.Name)}
          </option>
        ))}
      </select>
      {error && <span className="my-2 text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default SelectInput;
