"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-image.png')" }}
    >
      {/* Animated Content Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Fade in and slide up effect
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }} // Smooth transition
        className="flex min-h-[40vh] max-w-3xl flex-col items-center rounded-lg bg-white bg-opacity-90 p-10 text-center shadow-lg"
      >
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Minimal Pricing</h1>
        <p className="mt-3 text-lg font-semibold text-blue-600">
          💰 100% Free • No Sign-Up • Private & Secure
        </p>
        <p className="mt-2 text-[1.125rem] leading-relaxed text-gray-700">
          Instantly calculate costs, margins, and profits for your projects. Generate{" "}
          <strong>detailed quotes</strong> for yourself and <strong>customer-ready PDFs</strong>—all
          in your browser.
          <span className="font-bold text-red-500">
            {" "}
            Your data stays private and disappears when you close the tab.
          </span>
        </p>
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/tasks")}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-blue-500 bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg"
          >
            🚀 Get Started
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
