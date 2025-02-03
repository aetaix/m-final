"use client";

import { urlForButton } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";

export default function ButtonLinkHeader({
  children,
  button,
  href = null,
  target = null,
  ...otherProps
}: any) {
  const { locale } = useParams();

  const _href = useMemo(
    () => (href ? href : button ? urlForButton(button, locale) : "#"),
    [button, href, locale],
  );

  const _target = useMemo(
    () => (target ? target : button?.open_in_new_tab ? "_blank" : "_self"),
    [button, target],
  );

  return (
    <Link
      rel={button?.open_in_new_tab ? "noopener noreferrer" : undefined}
      href={_href}
      target={_target}
      scroll={_href !== "#"}
      {...otherProps}
    >
      {children}
    </Link>
  );
}
