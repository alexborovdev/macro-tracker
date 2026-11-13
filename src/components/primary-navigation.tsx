"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/foods", label: "Foods" },
  { href: "/goals", label: "Goals" },
];

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="pb-3">
      <ul className="grid grid-cols-3 gap-1 sm:flex">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="flex min-h-11 items-center justify-center rounded-lg px-2 text-sm font-medium text-muted-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground sm:px-4"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
