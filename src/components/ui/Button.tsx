import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  const variants = {
    primary: "bg-[var(--secondary)] text-[var(--primary)] hover:opacity-90",
    secondary: "bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90",
    ghost: "bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]",
    danger: "bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90",
  };

  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
