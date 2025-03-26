"use client";

import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, X } from "lucide-react";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const coffeeOptions = [
  { id: "prod_Roin99pzYVkC2q", name: "Small Coffee", price: 2.99, size: "h-5 w-5" },
  { id: "prod_RoinNAN9DGkrpP", name: "Medium Coffee", price: 4.99, size: "h-6 w-6" },
  { id: "prod_RoiofhYcczXZzW", name: "Large Coffee", price: 6.99, size: "h-8 w-8" },
];

export default function BuyMeCoffeeModal({ onClose }: { onClose: () => void }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm onClose={onClose} />
    </Elements>
  );
}

function PaymentForm({ onClose }: { onClose: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<{ name: string; price: number } | null>(
    null
  );

  // Handle payment when a coffee option is clicked
  const handleSelectPrice = async (priceId: string) => {
    if (!stripe) return;

    setErrorMessage(null);

    // Find the selected coffee
    const coffee = coffeeOptions.find((c) => c.id === priceId);
    if (coffee) setSelectedCoffee({ name: coffee.name, price: coffee.price });

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { clientSecret, message } = await response.json();
      if (!clientSecret) throw new Error(message || "Payment setup failed");

      setClientSecret(clientSecret); // Triggers hiding coffee options
    } catch (error) {
      const err = error as Error;
      console.error("Error creating payment intent:", err.message);
      setErrorMessage(err.message || "Something went wrong");
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (error) {
        console.error("Error creating payment:", error.message);
        throw new Error(error.message);
      }

      if (paymentIntent?.status === "succeeded") setSuccess(true);
    } catch (error) {
      const err = error as Error;
      console.error("Error:", err.message);
      setErrorMessage(err.message);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
      >
        <motion.div className="w-full max-w-md rounded-xl border border-neutral-300 bg-white p-6 shadow-2xl dark:border-neutral-600 dark:bg-neutral-900">
          {/* Title */}
          {!success && (
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-neutral-900 dark:text-white">
                Buy Me a Coffee ☕
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 transition hover:text-neutral-700 dark:hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Success Message */}
          {success ? (
            <div className="text-center text-neutral-900 dark:text-white">
              <h2 className="text-2xl font-bold">🎉 Thank You for Your Support!</h2>
              <p className="mt-2">Your coffee is greatly appreciated ☕</p>
              <button
                onClick={onClose}
                className="mt-4 w-full rounded bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-600"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {!clientSecret && (
                <>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">Choose an amount:</p>

                  {/* Coffee Selection Buttons (Hidden when payment form appears) */}
                  <div className="mt-4 space-y-3">
                    {coffeeOptions.map((coffee) => (
                      <button
                        key={coffee.id}
                        onClick={() => handleSelectPrice(coffee.id)}
                        className="flex w-full items-center justify-between rounded-lg bg-yellow-500 px-5 py-3 text-lg font-semibold text-black shadow-md transition-all hover:bg-yellow-600"
                      >
                        <div className="flex items-center gap-3">
                          <Coffee className={`${coffee.size}`} />
                          <span>{coffee.name}</span>
                        </div>
                        <span className="text-xl font-bold">${coffee.price.toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Show Payment Details When Coffee is Selected */}
              {clientSecret && selectedCoffee && (
                <div className="mt-4 flex justify-between rounded-lg bg-neutral-100 p-4 text-lg text-neutral-900 dark:bg-neutral-800 dark:text-white">
                  <span>Selected: {selectedCoffee.name}</span>
                  <span className="font-bold">${selectedCoffee.price.toFixed(2)}</span>
                </div>
              )}

              {/* Show Credit Card Input */}
              {clientSecret && (
                <div className="mt-4">
                  <div className="rounded-lg border border-neutral-300 bg-white p-3 dark:border-neutral-600 dark:bg-neutral-800">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#1F2937", // text-neutral-900
                            "::placeholder": { color: "#6B7280" }, // text-neutral-500
                          },
                          invalid: { color: "#ff4d4f" },
                        },
                      }}
                      className="w-full rounded bg-transparent p-2 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handlePayment}
                    className="mt-4 w-full rounded-lg bg-green-500 px-5 py-3 text-lg font-semibold text-white transition hover:bg-green-600"
                  >
                    Pay with Card
                  </button>
                </div>
              )}

              {/* Show Error Message */}
              {errorMessage && <p className="mt-3 text-red-500">{errorMessage}</p>}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
