"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex size-10 items-center justify-center rounded-full bg-neutral-300 text-neutral-800 transition-transform hover:scale-110 hover:bg-neutral-500 dark:bg-neutral-700 dark:text-neutral-200"
      aria-label="Change Theme"
    >
      {resolvedTheme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  );
};

export default ThemeSwitcher;
