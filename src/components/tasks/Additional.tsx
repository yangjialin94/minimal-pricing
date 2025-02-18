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
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-100">Additional</h3>
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
    <div className="relative w-full rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-md dark:border-gray-600">
      {/* Additional Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-medium text-gray-200">
          <p className="hidden sm:flex">🏡</p> {/* Hidden on small screens */}
          <input
            className="input-field min-w-[160px] flex-grow border-gray-600 bg-gray-900 text-lg font-semibold focus:border-blue-500 focus:ring focus:ring-blue-400/40 sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px]"
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <button
          className="rounded-full p-2 transition-all duration-200 hover:bg-red-700/20"
          onClick={handleRemoveAdditional}
        >
          <Trash2 className="h-6 w-6 text-red-500" />
        </button>
      </div>

      {/* Adjusted Grid for Small Screens */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        {/* Additional Cost Input */}
        <div className="flex w-full min-w-0 flex-col">
          <p className="text-sm text-gray-400">Cost</p>
          <NumericFormat
            className="input-field w-full border-gray-600 bg-gray-900 text-center focus:border-blue-500 focus:ring focus:ring-blue-400/40"
            placeholder="Cost"
            value={cost}
            decimalScale={2}
            allowNegative={false}
            thousandSeparator
            prefix="$"
            onValueChange={(values) => setCost(parseFloat(values.value) || 0)}
            customInput="input"
          />
        </div>
      </div>

      {/* Total Cost Section */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-3">
        <p className="text-lg font-medium text-gray-300">Total:</p>
        <p className="text-xl font-semibold text-blue-400">
          ${formatToDecimalCost(additional.cost, 2)}
        </p>
      </div>
    </div>
  );
}
