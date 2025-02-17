import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/useDebounce";
import { useTasksDispatch } from "@/hooks/useTasksDispatch";
import { formatToDecimalCost } from "@/lib/format";
import { Additional as AdditionalType } from "@/types";

interface AdditionalProps {
  taskId: number;
  additional: AdditionalType[];
}

interface AdditionalComponentProps {
  taskId: number;
  additional: AdditionalType;
}

export default function Additional({ taskId, additional }: AdditionalProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-gray-700">Additional</h3>
      <ul className="flex w-full flex-col gap-4">
        {additional.map((add) => (
          <li key={add.id}>
            <AdditionalComponent taskId={taskId} additional={add} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdditionalComponent({ taskId, additional }: AdditionalComponentProps) {
  const dispatch = useTasksDispatch();

  // Local states for debouncing inputs
  const [type, setType] = useState(additional.type ?? "");
  const [cost, setCost] = useState(additional.cost ?? 0);

  // Debounced values
  const debouncedType = useDebounce(type, 500);
  const debouncedCost = useDebounce(cost, 500);

  // Update additional
  useEffect(() => {
    dispatch({
      type: "updated_additional",
      payload: {
        taskId,
        additionalId: additional.id,
        additionalType: debouncedType,
        additionalCost: debouncedCost,
      },
    });
  }, [debouncedType, debouncedCost, dispatch, additional.id, taskId]);

  // Remove additional
  const handleRemoveAdditional = useCallback(() => {
    dispatch({
      type: "removed_additional",
      payload: {
        taskId: taskId,
        additionalId: additional.id,
      },
    });
  }, [dispatch, additional.id, taskId]);

  return (
    <div className="relative flex w-full flex-wrap items-center gap-3 rounded-md border p-2 lg:border-none">
      <div className="flex w-[calc(100%-40px)] flex-wrap items-center gap-3">
        🏡
        {/* Additional Type Input */}
        <input
          className="text-md min-w-[100px] flex-1 rounded-md border px-2 py-1"
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        {/* Additional Cost Input */}
        <NumericFormat
          className="text-md w-24 min-w-[80px] rounded-md border px-2 py-1 text-center"
          placeholder="Cost"
          value={cost}
          decimalScale={2}
          allowNegative={false}
          thousandSeparator
          prefix="$"
          onValueChange={(values) => setCost(parseFloat(values.value) || 0)}
          customInput="input"
        />
        <p className="text-gray-600">=</p>
        {/* Additional Cost */}
        <p className="font-semibold text-blue-600">${formatToDecimalCost(additional.cost, 2)}</p>
      </div>

      {/* Delete Button - Positioned Outside */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-2 transition-all duration-200 hover:bg-red-100"
        onClick={handleRemoveAdditional}
      >
        <Trash2 className="h-5 w-5 text-red-500" />
      </button>
    </div>
  );
}
