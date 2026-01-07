"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";

interface FloatingFormInputProps {
  control: any;
  name: string;
  className?: string;
  type?: "text" | "password";
  label: string;
}

const FloatingFormInput = ({
  control,
  name,
  className,
  type,
  label,
}: FloatingFormInputProps) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const isActive = focusedInput === name || field.value.length > 0;
        return (
          <FormItem className={`relative ${className}`}>
            <FormControl>
              <div className="relative">
                <input
                  {...field}
                  type={
                    type === "password"
                      ? isShowPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  className="w-full border-b border-[rgba(0,0,0,0.6)] outline-none font-gilRegular pt-6 pb-1 bg-transparent"
                  onFocus={() => setFocusedInput(name)}
                  onBlur={() => setFocusedInput(null)}
                />

                {type === "password" && (
                  <div
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute right-0 top-[70%] translate-y-[-70%] cursor-pointer text-neutral-600"
                  >
                    {!isShowPassword ? (
                      <RiEyeLine size={18} />
                    ) : (
                      <RiEyeOffLine size={18} />
                    )}
                  </div>
                )}
              </div>
            </FormControl>

            <FormLabel
              className={`absolute left-0 transition-all duration-300 ease-out uppercase pointer-events-none font-gilRegular ${
                isActive
                  ? "top-0 text-[10px] text-black tracking-wider"
                  : "top-5 text-xs text-gray-500"
              }`}
            >
              {label}
            </FormLabel>
            <FormMessage className="text-red-500 font-gilRegular" />
          </FormItem>
        );
      }}
    />
  );
};

export default FloatingFormInput;
