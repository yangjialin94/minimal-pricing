import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/useDebounce";
import { useTasksDispatch } from "@/hooks/useTasksDispatch";
import { formatToDecimalCost } from "@/lib/format";
import { Additional as AdditionalType } from "@/types";

interface AdditionalProps {
  taskId: string;
  additional: AdditionalType[];
}

interface AdditionalComponentProps {
  taskId: string;
  additional: AdditionalType;
}

export default function Additional({ taskId, additional }: AdditionalProps) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Additional</h3>
      <ul className="mt-3 space-y-6">
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
    <div className="material-card relative w-full rounded-lg border border-neutral-300 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-600 dark:bg-neutral-800">
      {/* Additional Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-full items-center gap-4">
          <label className="flex flex-1 items-center gap-3 text-xl font-semibold text-neutral-900 dark:text-neutral-200">
            <span className="hidden sm:flex">🏡️</span>
            <input
              className="input-field"
              type="text"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>
        </div>
        <button
          className="ml-4 rounded-full p-2 transition-all duration-200 hover:bg-red-700/20"
          onClick={handleRemoveAdditional}
        >
          <Trash2 className="h-6 w-6 text-red-500" />
        </button>
      </div>

      {/* Additional Cost Input */}
      <div className="flex w-full items-center gap-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Cost</p>
        <NumericFormat
          className="input-field !w-1/2 text-center"
          placeholder="Cost"
          value={cost}
          decimalScale={2}
          allowNegative={false}
          thousandSeparator
          prefix="$"
          onValueChange={(values) => setCost(parseFloat(values.value) || 0)}
        />
      </div>

      {/* Total Cost Section */}
      <div className="mt-4 flex items-center justify-between border-t border-neutral-300 pt-3 dark:border-neutral-700">
        <p className="text-lg font-medium text-neutral-900 dark:text-neutral-300">Total:</p>
        <p className="text-xl font-semibold text-blue-500 dark:text-blue-400">
          ${formatToDecimalCost(additional.cost, 2)}
        </p>
      </div>
    </div>
  );
}
