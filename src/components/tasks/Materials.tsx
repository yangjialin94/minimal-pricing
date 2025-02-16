import { Package, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/useDebounce";
import { useTasksDispatch } from "@/hooks/useTasksDispatch";
import { formatToDecimalCost } from "@/lib/format";
import { Material } from "@/types";

interface MaterialsProps {
  taskId: number;
  materials: Material[];
}

interface MaterialComponentProps {
  taskId: number;
  material: Material;
}

export default function Materials({ taskId, materials }: MaterialsProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-gray-700">Materials</h3>
      <ul className="flex w-full flex-col gap-4">
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
        taskId: taskId,
        materialId: material.id,
      },
    });
  }, [dispatch, material.id, taskId]);

  return (
    <div className="flex w-full flex-wrap items-center gap-3 rounded-lg border p-2 lg:border-none">
      <Package className="h-5 w-5 text-gray-600" />

      {/* Material Name Input */}
      <input
        className="text-md min-w-[100px] flex-1 rounded-md border px-2 py-1"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Material Unit Cost Input */}
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

      {/* Material Unit Input */}
      <input
        className="text-md w-16 min-w-[60px] rounded-md border px-2 py-1 text-center"
        type="text"
        placeholder="Unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />

      <p className="text-gray-600">×</p>

      {/* Material Quantity Input */}
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

      {/* Material Cost */}
      <p className="font-semibold text-blue-600">${formatToDecimalCost(material.cost, 2)}</p>

      {/* Delete Button */}
      <button
        className="flex-shrink-0 rounded-full p-2 transition-all duration-200 hover:bg-slate-200"
        onClick={handleRemoveMaterial}
      >
        <Trash2 className="h-5 w-5 text-red-500" />
      </button>
    </div>
  );
}
