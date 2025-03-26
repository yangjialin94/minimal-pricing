// "use client";

// import { Moon, Sun } from "lucide-react"; // Install Lucide icons for better UI
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

// export default function ThemeSwitcher() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Avoid hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <button
//       className="flex items-center justify-center rounded-full bg-gray-200 p-3 text-gray-900 shadow-md transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//     >
//       {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//     </button>
//   );
// }

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
      className="fixed right-4 top-4 flex size-10 items-center justify-center rounded-full bg-gray-800 text-white transition-transform hover:scale-110 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  );
};

export default ThemeSwitcher;
