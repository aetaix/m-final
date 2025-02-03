"use client";

import { urlForButton } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function ButtonLink({
  children,
  button,
  href = null,
  target = null,
  ...otherProps
}: any) {
  const { locale } = useParams();

  const _href = useMemo(() => {
    if (href) return href;
    if (button) return urlForButton(button, locale);
    return "#";
  }, [button, href, locale]);

  const _target = useMemo(() => {
    if (target) return target;
    return button?.open_in_new_tab ? "_blank" : "_self";
  }, [button, target]);

  if (button?.visible === false) return null;

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
