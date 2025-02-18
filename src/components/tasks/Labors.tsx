import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/useDebounce";
import { useTasksDispatch } from "@/hooks/useTasksDispatch";
import { formatToDecimalCost } from "@/lib/format";
import { Labor } from "@/types";

interface LaborsProps {
  taskId: number;
  labors: Labor[];
}

interface LaborComponentProps {
  taskId: number;
  labor: Labor;
}

export default function Labors({ taskId, labors }: LaborsProps) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-100">Labors</h3>
      <ul className="mt-3 space-y-6">
        {labors.map((labor) => (
          <li key={labor.id}>
            <LaborComponent taskId={taskId} labor={labor} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LaborComponent({ taskId, labor }: LaborComponentProps) {
  const dispatch = useTasksDispatch();

  // Local states for debouncing inputs
  const [role, setRole] = useState(labor.role ?? "");
  const [unit, setUnit] = useState(labor.unit ?? "");
  const [quantity, setQuantity] = useState(labor.quantity ?? 0);
  const [unitCost, setUnitCost] = useState(labor.unitCost ?? 0);

  // Debounced values
  const debouncedRole = useDebounce(role, 500);
  const debouncedUnit = useDebounce(unit, 500);
  const debouncedQuantity = useDebounce(quantity, 500);
  const debouncedUnitCost = useDebounce(unitCost, 500);

  // Update labor
  useEffect(() => {
    dispatch({
      type: "updated_labor",
      payload: {
        taskId,
        laborId: labor.id,
        laborRole: debouncedRole,
        laborUnit: debouncedUnit,
        laborQuantity: debouncedQuantity,
        laborUnitCost: debouncedUnitCost,
      },
    });
  }, [
    debouncedRole,
    debouncedUnit,
    debouncedQuantity,
    debouncedUnitCost,
    dispatch,
    labor.id,
    taskId,
  ]);

  // Remove labor
  const handleRemoveLabor = useCallback(() => {
    dispatch({
      type: "removed_labor",
      payload: {
        taskId,
        laborId: labor.id,
      },
    });
  }, [dispatch, labor.id, taskId]);

  return (
    <div className="relative w-full rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-md dark:border-gray-600">
      {/* Labor Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-medium text-gray-200">
          <p className="hidden sm:flex">🛠️</p> {/* Hidden on small screens */}
          <input
            className="input-field min-w-[160px] flex-grow border-gray-600 bg-gray-900 text-lg font-semibold focus:border-blue-500 focus:ring focus:ring-blue-400/40 sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px]"
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button
          className="rounded-full p-2 transition-all duration-200 hover:bg-red-700/20"
          onClick={handleRemoveLabor}
        >
          <Trash2 className="h-6 w-6 text-red-500" />
        </button>
      </div>

      {/* Adjusted Grid for Small Screens */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        {/* Price Per Unit */}
        <div className="flex w-full min-w-0 flex-col">
          <p className="text-sm text-gray-400">Price Per Unit</p>
          <div className="flex flex-nowrap items-center gap-2">
            <NumericFormat
              className="input-field w-full border-gray-600 bg-gray-900 text-center focus:border-blue-500 focus:ring focus:ring-blue-400/40"
              placeholder="Unit Cost"
              value={unitCost}
              decimalScale={2}
              allowNegative={false}
              thousandSeparator
              prefix="$"
              onValueChange={(values) => setUnitCost(parseFloat(values.value) || 0)}
              customInput="input"
            />
            <p className="mx-1 min-w-[20px] text-center text-gray-400">per</p>{" "}
            <input
              className="input-field w-full border-gray-600 bg-gray-900 text-center focus:border-blue-500 focus:ring focus:ring-blue-400/40"
              type="text"
              placeholder="Unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
        </div>

        {/* Quantity */}
        <div className="flex w-full min-w-0 flex-col">
          <p className="text-sm text-gray-400">Quantity</p>
          <NumericFormat
            className="input-field w-full border-gray-600 bg-gray-900 text-center focus:border-blue-500 focus:ring focus:ring-blue-400/40"
            placeholder="Quantity"
            value={quantity}
            decimalScale={2}
            allowNegative={false}
            onValueChange={(values) => setQuantity(parseFloat(values.value) || 0)}
            customInput="input"
          />
        </div>
      </div>

      {/* Total Cost Section */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-3">
        <p className="text-lg font-medium text-gray-300">Total:</p>
        <p className="text-xl font-semibold text-blue-400">${formatToDecimalCost(labor.cost, 2)}</p>
      </div>
    </div>
  );
}
