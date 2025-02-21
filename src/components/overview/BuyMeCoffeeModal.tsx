import { loadStripe } from "@stripe/stripe-js";
import { Coffee, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const coffeeOptions = [
  { id: "price_1CoffeeSmall", name: "Small Coffee", price: 2.99, size: "h-5 w-5" },
  { id: "price_1CoffeeMedium", name: "Medium Coffee", price: 4.99, size: "h-6 w-6" },
  { id: "price_1CoffeeLarge", name: "Large Coffee", price: 6.99, size: "h-8 w-8" },
];

export default function BuyMeCoffeeModal({ onClose }: { onClose: () => void }) {
  const [success, setSuccess] = useState(false);

  const handleCheckout = async (priceId: string) => {
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
    setSuccess(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
      >
        {success ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-gray-900 p-6 text-white shadow-lg">
              <h2 className="text-2xl font-bold">🎉 Thank You for Your Support!</h2>
              <p className="mt-2">Your coffee is greatly appreciated ☕</p>
              <button
                onClick={onClose}
                className="mt-4 rounded bg-yellow-500 px-4 py-2 font-semibold text-black"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
                Buy Me a Coffee ☕
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 transition hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <p className="mt-2 text-center text-gray-300">
              If you like my work, feel free to support me!
            </p>

            {/* Coffee Options */}
            <div className="mt-6 space-y-3">
              {coffeeOptions.map((coffee) => (
                <motion.button
                  key={coffee.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCheckout(coffee.id)}
                  className="flex w-full items-center justify-between rounded-lg bg-yellow-500 px-5 py-3 text-lg font-semibold text-black shadow-md transition-all hover:bg-yellow-600"
                >
                  <div className="flex items-center gap-3">
                    <Coffee className={`${coffee.size}`} />
                    {coffee.name}
                  </div>
                  <span>${coffee.price.toFixed(2)}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
