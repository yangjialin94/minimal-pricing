"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex w-full max-w-3xl flex-col items-center rounded-lg bg-white bg-opacity-90 p-6 text-center shadow-lg dark:bg-neutral-800 dark:bg-opacity-90 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16"
      style={{ backgroundImage: "url('/bg-image.png')" }}
    >
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-4xl md:text-5xl">
        Welcome to Minimal Pricing
      </h1>

      <p className="mt-3 text-lg font-semibold text-blue-600 sm:text-xl md:text-2xl">
        💰 100% Free • No Sign-Up • Private & Secure
      </p>

      <p className="mt-2 text-[1rem] leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-[1.125rem] md:text-[1.25rem]">
        Instantly calculate costs, margins, and profits for your projects. Generate{" "}
        <strong>detailed quotes</strong> for yourself and <strong>customer-ready PDFs</strong>— all
        in your browser.
        <span className="font-bold text-red-500 dark:text-red-400">
          {" "}
          Your data stays private and disappears when you close the tab.
        </span>
      </p>

      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/tasks")}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-blue-500 bg-blue-500 px-5 py-2.5 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg dark:border-blue-400 dark:bg-blue-400 dark:hover:bg-blue-500 sm:px-6 sm:py-3 sm:text-lg md:px-7 md:py-3.5 md:text-xl lg:px-8 lg:py-4"
        >
          🚀 Get Started
        </motion.button>
      </div>
    </motion.div>
  );
}
