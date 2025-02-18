import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/useDebounce";
import { useProjectDispatch } from "@/hooks/useProjectDispatch";

interface ProfitCalculatorProps {
  totalProfit: number;
}

export default function ProfitCalculator({ totalProfit }: ProfitCalculatorProps) {
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
        className="input-field w-28 text-center sm:w-32"
        placeholder="$0.00"
        value={localTotalProfit}
        decimalScale={2}
        allowNegative={false}
        thousandSeparator
        prefix="$"
        onValueChange={handleValueChange}
      />
    </>
  );
}
