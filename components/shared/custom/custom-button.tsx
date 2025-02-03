"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "@/types/directus-schema";
import { PropsWithChildren } from "react";
import DirectusImageClient from "../directus-image-client";
import { IconPosition } from "@/constants/enum";

interface CButtonProps extends ButtonProps {
  overText?: boolean;
  hideIcon?: boolean;
  icon?: Icon;
  label?: string;
  btn?: any;
  ctaColor?: string;
  iconClassName?: string;
  loading?: boolean;
  iconPosition?: IconPosition;
}

export const CButton = ({
  loading,
  className,
  overText,
  hideIcon,
  icon,
  label,
  iconPosition = IconPosition.END,
  btn,
  ctaColor,
  iconClassName,
  ...restProps
}: PropsWithChildren<CButtonProps>) => {
  const btnIcon = btn?.icon?.[0]?.icons_id;
  return (
    <Button
      disabled={loading}
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent hover:text-primary dark:hover:text-mistral-orange-bright border-foreground border-0 border-b disabled:opacity-50 disabled:cursor-not-allowed",
        className,
        overText
          ? "text-white drop-shadow border-white dark:border-white hover:text-white"
          : "",
      )}
      style={
        ctaColor
          ? {
              color: ctaColor,
              borderColor: "currentcolor",
            }
          : {}
      }
      {...restProps}
    >
      {!hideIcon &&
        (btn?.icon || icon) &&
        iconPosition === IconPosition.START &&
        renderIcon()}
      {btn?.label || label}
      {!hideIcon &&
        (btn?.icon || icon) &&
        iconPosition === IconPosition.END &&
        renderIcon()}
    </Button>
  );

  function renderIcon() {
    return (
      <div className={cn("relative flex size-6 items-center justify-center")}>
        <DirectusImageClient
          className={cn(
            "size-3 flex object-contain items-center justify-center text-primary",
            iconClassName,
          )}
          fill
          asset={btnIcon || icon}
        />
      </div>
    );
  }
};
