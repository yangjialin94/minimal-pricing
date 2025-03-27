"use client";

import { Coffee } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";

import BuyMeCoffeeModal from "@/components/BuyMeCoffeeModal";

const BuyCoffeeBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.button
        onClick={handleOpenModal}
        className="flex size-10 items-center justify-center rounded-full bg-neutral-300 text-neutral-800 transition-transform hover:scale-110 hover:bg-neutral-500 dark:bg-neutral-700 dark:text-neutral-200"
        aria-label="Buy Me a Coffee"
      >
        <Coffee className="size-6" />
      </motion.button>

      {/* Payment Modal */}
      {isModalOpen && <BuyMeCoffeeModal onClose={handleCloseModal} />}
    </>
  );
};

export default BuyCoffeeBtn;
