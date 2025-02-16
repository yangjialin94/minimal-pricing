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
    <div className="flex items-center gap-4">
      {/* Dollar Amount Input */}
      <NumericFormat
        className="w-40 rounded-lg border border-slate-300 px-4 text-lg placeholder:text-lg placeholder:font-normal focus:placeholder-transparent"
        placeholder="Total profit in $"
        value={localTotalProfit}
        decimalScale={2}
        allowNegative={false}
        thousandSeparator
        prefix="$"
        onValueChange={handleValueChange}
        customInput="input"
      />

      {/* Profit margin display*/}
      <span className="text-lg font-bold text-red-500">{profitMargin.toFixed(1)}%</span>
    </div>
  );
}
