import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/useDebounce";
import { useTasksDispatch } from "@/hooks/useTasksDispatch";
import { formatToDecimalCost } from "@/lib/format";
import { Material } from "@/types";

interface MaterialsProps {
  taskId: string;
  materials: Material[];
}

interface MaterialComponentProps {
  taskId: string;
  material: Material;
}

export default function Materials({ taskId, materials }: MaterialsProps) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-100">Materials</h3>
      <ul className="mt-3 space-y-6">
        {materials.map((material) => (
          <li key={material.id}>
            <MaterialComponent taskId={taskId} material={material} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MaterialComponent({ taskId, material }: MaterialComponentProps) {
  const dispatch = useTasksDispatch();

  // Local states for debouncing inputs
  const [name, setName] = useState(material.name ?? "");
  const [unit, setUnit] = useState(material.unit ?? "");
  const [quantity, setQuantity] = useState(material.quantity ?? 0);
  const [unitCost, setUnitCost] = useState(material.unitCost ?? 0);

  // Debounced values
  const debouncedName = useDebounce(name, 500);
  const debouncedUnit = useDebounce(unit, 500);
  const debouncedQuantity = useDebounce(quantity, 500);
  const debouncedUnitCost = useDebounce(unitCost, 500);

  // Update material
  useEffect(() => {
    dispatch({
      type: "updated_material",
      payload: {
        taskId,
        materialId: material.id,
        materialName: debouncedName,
        materialUnit: debouncedUnit,
        materialQuantity: debouncedQuantity,
        materialUnitCost: debouncedUnitCost,
      },
    });
  }, [
    debouncedName,
    debouncedUnit,
    debouncedQuantity,
    debouncedUnitCost,
    dispatch,
    material.id,
    taskId,
  ]);

  // Remove material
  const handleRemoveMaterial = useCallback(() => {
    dispatch({
      type: "removed_material",
      payload: {
        taskId,
        materialId: material.id,
      },
    });
  }, [dispatch, material.id, taskId]);

  return (
    <div className="relative w-full rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-md dark:border-gray-600">
      {/* Material Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-full items-center gap-4">
          <label className="flex flex-1 items-center gap-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            <span className="hidden sm:flex">📦</span>
            <input
              className="input-field"
              type="text"
              placeholder="Material Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <button
          className="ml-4 rounded-full p-2 transition-all duration-200 hover:bg-red-700/20"
          onClick={handleRemoveMaterial}
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
              className="input-field text-center"
              placeholder="Unit Cost"
              value={unitCost}
              decimalScale={2}
              allowNegative={false}
              thousandSeparator
              prefix="$"
              onValueChange={(values) => setUnitCost(parseFloat(values.value) || 0)}
            />
            <p className="mr-2 min-w-[20px] text-center text-gray-400">per</p>{" "}
            <input
              className="input-field text-center"
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
            className="input-field text-center"
            placeholder="Quantity"
            value={quantity}
            decimalScale={2}
            allowNegative={false}
            onValueChange={(values) => setQuantity(parseFloat(values.value) || 0)}
          />
        </div>
      </div>

      {/* Total Cost Section */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-3">
        <p className="text-lg font-medium text-gray-300">Total:</p>
        <p className="text-xl font-semibold text-blue-400">
          ${formatToDecimalCost(material.cost, 2)}
        </p>
      </div>
    </div>
  );
}
