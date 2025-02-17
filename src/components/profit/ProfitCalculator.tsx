import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/useDebounce";
import { useProjectDispatch } from "@/hooks/useProjectDispatch";

interface ProfitCalculatorProps {
  profitMargin: number; // e.g., 10 means 10%
  totalProfit: number;
}

export default function ProfitCalculator({ profitMargin, totalProfit }: ProfitCalculatorProps) {
  const dispatch = useProjectDispatch();
  const [localTotalProfit, setLocalTotalProfit] = useState(totalProfit.toString());

  // Sync local state
  useEffect(() => {
    setLocalTotalProfit(totalProfit.toString());
  }, [totalProfit]);

  // Debounced state
  const debouncedTotalProfit = useDebounce(localTotalProfit, 500);

  // Dispatch update
  useEffect(() => {
    const profit = parseFloat(debouncedTotalProfit);

    if (!isNaN(profit)) {
      dispatch({
        type: "updated_total_profit",
        payload: { totalProfit: parseFloat(profit.toFixed(2)) },
      });
    }
  }, [debouncedTotalProfit, dispatch]);

  // Immediately update local state
  const handleValueChange = (values: { value: string }) => {
    setLocalTotalProfit(values.value);
  };

  return (
    <>
      {/* Numeric input for profit */}
      <NumericFormat
        className="w-32 rounded-md border border-gray-300 px-3 py-1 text-base placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        placeholder="$0.00"
        value={localTotalProfit}
        decimalScale={2}
        allowNegative={false}
        thousandSeparator
        prefix="$"
        onValueChange={handleValueChange}
      />

      {/* Profit margin display */}
      <span className="text-base font-bold text-red-500 transition-colors duration-300">
        {profitMargin.toFixed(1)}%
      </span>
    </>
  );
}
