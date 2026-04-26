"use client";

import { useState, type ChangeEvent, type FocusEvent } from "react";
import { cn } from "@/lib/utils";

type CommonProps = {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
};

type InputProps = CommonProps & {
  type?: "text" | "email";
  value: string;
  onChange: (value: string) => void;
};

export function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  className,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  const handleBlur = (_: FocusEvent<HTMLInputElement>) => setFocused(false);

  return (
    <div className={cn("relative", className)}>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        className="peer w-full border-b border-border-medium bg-transparent px-0 pb-2 pt-7 font-body text-sm text-text-primary transition-colors focus:border-accent focus:outline-none"
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 font-ui font-semibold uppercase transition-all duration-300 ease-out",
          isFloating
            ? "top-0 text-[10px] tracking-label text-accent"
            : "top-7 text-xs tracking-button text-text-secondary",
        )}
      >
        {label}
        {required && " *"}
      </label>
    </div>
  );
}

type TextareaProps = CommonProps & {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
};

export function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  required,
  rows = 4,
  className,
}: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full resize-y border-b border-border-medium bg-transparent px-0 pb-2 pt-7 font-body text-sm leading-relaxed text-text-primary transition-colors focus:border-accent focus:outline-none"
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 font-ui font-semibold uppercase transition-all duration-300 ease-out",
          isFloating
            ? "top-0 text-[10px] tracking-label text-accent"
            : "top-7 text-xs tracking-button text-text-secondary",
        )}
      >
        {label}
        {required && " *"}
      </label>
    </div>
  );
}
