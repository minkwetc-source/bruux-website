"use client";

import {
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full border border-border-medium bg-bg-elevated px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none";

export function AdminInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function AdminTextarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={cn(inputClass, "min-h-32 resize-y leading-relaxed", props.className)}
    />
  );
}

export function AdminSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        inputClass,
        "appearance-none bg-[length:14px] bg-[right_18px_center] bg-no-repeat pr-12",
        props.className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
      }}
    >
      {props.children}
    </select>
  );
}

export function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-ui text-[10px] font-semibold uppercase tracking-label text-text-secondary"
    >
      {children}
      {required && " *"}
    </label>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "danger" | "ghost";
};

export function AdminButton({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-accent text-bg-primary hover:bg-accent-hover disabled:opacity-60",
    outline:
      "border border-border-medium bg-transparent text-text-primary hover:border-accent hover:text-accent",
    danger:
      "border border-red-900/60 bg-red-950/30 text-red-300 hover:border-red-500 hover:text-red-200",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary",
  };
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-ui text-[11px] font-semibold uppercase tracking-button transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SubmitButton({
  children,
  pendingLabel = "Enregistrement…",
  variant = "primary",
}: {
  children: ReactNode;
  pendingLabel?: string;
  variant?: ButtonProps["variant"];
}) {
  const { pending } = useFormStatus();
  return (
    <AdminButton type="submit" disabled={pending} variant={variant}>
      {pending ? pendingLabel : children}
    </AdminButton>
  );
}
