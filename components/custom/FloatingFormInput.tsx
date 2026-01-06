"use client";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { setHeapSnapshotNearHeapLimit } from "v8";
import { intersection } from "zod";

interface FloatingFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
}

const FloatingFormInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
}: FloatingFormInputProps<T>) => {
  const [active, setActive] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormControl>
            <input
              type={type}
              {...field}
              onFocus={() => setActive(true)}
              onBlur={(e) => {
                setActive(false);
                setHasValue(e.target.value.length > 0);
                field.onBlur();
              }}
              onChange={(e) => {
                setHasValue(e.target.value.length > 0);
                field.onChange(e);
              }}
            />
          </FormControl>

          <FormLabel
            className={`
              pointer-events-none absolute left-0
              text-xs uppercase font-gilLight text-gray-500
              transition-all duration-300 ease-out
              ${
                active || hasValue
                  ? "top-1 scale-90 text-black"
                  : "top-5 scale-100"
              }
            `}
          >
            {label}
          </FormLabel>

          <FormMessage className="font-gilRegular text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FloatingFormInput;
