"use client";

import clsx from "clsx";
import { CircleDollarSign, LayoutList, SquareChartGantt, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation bar component
 */
const NavBar = () => {
  const pathname = usePathname();

  console.log(pathname);

  const navItems = [
    { label: "Tasks", href: "/tasks", icon: LayoutList },
    { label: "Profit", href: "/profit", icon: CircleDollarSign },
    { label: "Users", href: "/users", icon: Users },
    { label: "Overview", href: "/overview", icon: SquareChartGantt },
  ];

  return (
    <nav className="w-[100px] flex-1">
      <ul className="flex w-full flex-col items-center gap-4 p-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              className={clsx(
                "flex w-16 flex-col items-center gap-2 rounded-2xl p-2 hover:bg-neutral-400 dark:hover:bg-neutral-600",
                {
                  "pointer-events-none bg-blue-400 dark:bg-blue-600": pathname === item.href,
                }
              )}
              href={item.href}
            >
              <item.icon className="size-6 text-neutral-800 dark:text-neutral-200" />
              <span className="text-xs text-neutral-800 dark:text-neutral-200">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
