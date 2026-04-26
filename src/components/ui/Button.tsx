"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useMediaQuery, breakpoints } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "white" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Active l'effet magnétique au curseur (desktop uniquement). */
  magnetic?: boolean;
};

type ButtonOnlyProps = Omit<
  HTMLMotionProps<"button">,
  "className" | "children" | keyof CommonProps
> & { href?: undefined };

type LinkOnlyProps = {
  href: string;
  target?: string;
  rel?: string;
};

type Props = CommonProps & (ButtonOnlyProps | LinkOnlyProps);

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-bg-primary hover:bg-accent-hover",
  outline:
    "bg-transparent border border-white/30 text-text-primary hover:border-white",
  white: "bg-white text-bg-primary hover:bg-white/90",
  ghost:
    "bg-transparent text-text-secondary hover:text-accent border-b border-transparent hover:border-accent",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-8 py-[14px] text-xs",
  lg: "px-10 py-4 text-[13px]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-body font-semibold uppercase tracking-button transition-colors duration-300 ease-out-cubic select-none";

export function Button(props: Props) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    magnetic = false,
  } = props;

  const isDesktop = useMediaQuery(breakpoints.desktop);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const canMagnetize = magnetic && isDesktop;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!canMagnetize) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.25,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.25,
    });
  };

  const handleMouseLeave = () => {
    if (canMagnetize) setPos({ x: 0, y: 0 });
  };

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  const motionProps = {
    animate: pos,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 200, damping: 18 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel } = props;
    return (
      <motion.span className="inline-flex" {...motionProps}>
        <Link href={href} target={target} rel={rel} className={classes}>
          {children}
        </Link>
      </motion.span>
    );
  }

  const buttonProps = props as CommonProps & ButtonOnlyProps;
  const {
    variant: _v,
    size: _s,
    magnetic: _m,
    className: _cn,
    children: _c,
    href: _h,
    ...rest
  } = buttonProps;

  return (
    <motion.button className={classes} {...motionProps} {...rest}>
      {children}
    </motion.button>
  );
}
