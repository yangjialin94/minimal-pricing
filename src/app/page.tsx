"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center px-4 md:px-8"
      style={{ backgroundImage: "url('/bg-image.png')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex w-full max-w-3xl flex-col items-center rounded-lg bg-white bg-opacity-90 p-6 text-center shadow-lg sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16 dark:bg-gray-800 dark:bg-opacity-90"
      >
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
          Welcome to Minimal Pricing
        </h1>

        <p className="mt-3 text-lg font-semibold text-blue-600 sm:text-xl md:text-2xl">
          💰 100% Free • No Sign-Up • Private & Secure
        </p>

        <p className="mt-2 text-[1rem] leading-relaxed text-gray-700 sm:text-[1.125rem] md:text-[1.25rem] dark:text-gray-300">
          Instantly calculate costs, margins, and profits for your projects. Generate{" "}
          <strong>detailed quotes</strong> for yourself and <strong>customer-ready PDFs</strong>—
          all in your browser.
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
            className="flex items-center justify-center gap-2 rounded-full border-2 border-blue-500 bg-blue-500 px-5 py-2.5 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg sm:px-6 sm:py-3 sm:text-lg md:px-7 md:py-3.5 md:text-xl lg:px-8 lg:py-4 dark:border-blue-400 dark:bg-blue-400 dark:hover:bg-blue-500"
          >
            🚀 Get Started
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
