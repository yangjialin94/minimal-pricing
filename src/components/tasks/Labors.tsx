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
    <div className="flex w-full flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-gray-700">Labors</h3>
      <ul className="flex w-full flex-col gap-4">
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
        taskId: taskId,
        laborId: labor.id,
      },
    });
  }, [dispatch, labor.id, taskId]);

  return (
    <div className="relative flex w-full flex-wrap items-center gap-3 rounded-md border p-2 lg:border-none">
      <div className="flex w-[calc(100%-40px)] flex-wrap items-center gap-3">
        🛠️
        {/* Labor Role Input */}
        <input
          className="text-md min-w-[100px] flex-1 rounded-md border px-2 py-1"
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        {/* Labor Unit Cost Input */}
        <NumericFormat
          className="text-md w-24 min-w-[80px] rounded-md border px-2 py-1 text-center"
          placeholder="Unit Cost"
          value={unitCost}
          decimalScale={2}
          allowNegative={false}
          thousandSeparator
          prefix="$"
          onValueChange={(values) => setUnitCost(parseFloat(values.value) || 0)}
          customInput="input"
        />
        <p className="text-gray-600">/</p>
        {/* Labor Unit Input */}
        <input
          className="text-md w-16 min-w-[60px] rounded-md border px-2 py-1 text-center"
          type="text"
          placeholder="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <p className="text-gray-600">×</p>
        {/* Labor Quantity Input */}
        <NumericFormat
          className="text-md w-20 min-w-[80px] rounded-md border px-2 py-1 text-center"
          placeholder="Quantity"
          value={quantity}
          decimalScale={2}
          allowNegative={false}
          onValueChange={(values) => setQuantity(parseFloat(values.value) || 0)}
          customInput="input"
        />
        <p className="text-gray-600">=</p>
        {/* Labor Cost */}
        <p className="font-semibold text-blue-600">${formatToDecimalCost(labor.cost, 2)}</p>
      </div>

      {/* Delete Button - Positioned Outside */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-2 transition-all duration-200 hover:bg-red-100"
        onClick={handleRemoveLabor}
      >
        <Trash2 className="h-5 w-5 text-red-500" />
      </button>
    </div>
  );
}
