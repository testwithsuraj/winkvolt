"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SmartLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Link that understands home-page section links ("/#process"): on the home page
 * it renders a plain hash link so smooth scrolling takes over; elsewhere it
 * navigates to the home page and lands on the section.
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  const pathname = usePathname();
  if (href.startsWith("/#") && pathname === "/") {
    return <a href={href.slice(1)} {...(props as React.ComponentProps<"a">)} />;
  }
  return <Link href={href} {...props} />;
}
