import clsx from "clsx";
import { DollarSign, Hash, Package, Plus, Ruler, Trash2 } from "lucide-react";
import { useCallback } from "react";

import { useTasksDispatch } from "@/context/TasksContext";
import { formatToDecimalCost } from "@/lib/format";
import { Material } from "@/types";

interface MaterialsProps {
  taskId: number;
  materials: Material[];
}

interface MaterialListProps {
  taskId: number;
  materials: Material[];
}

interface AddMaterialProps {
  taskId: number;
  hasMaterial: boolean;
}

interface MaterialComponentProps {
  taskId: number;
  material: Material;
}

export default function Materials({ taskId, materials }: MaterialsProps) {
  const hasMaterial = materials.length > 0;

  return (
    <div>
      {hasMaterial && <h2 className="mb-4 text-center text-xl font-bold">Materials</h2>}
      <MaterialList taskId={taskId} materials={materials} />
      <AddMaterial taskId={taskId} hasMaterial={hasMaterial} />
    </div>
  );
}

function MaterialList({ taskId, materials }: MaterialListProps) {
  return (
    <div className="flex w-full items-center gap-4">
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

  // Update material
  const handleUpdateMaterial = useCallback(
    (updates: { name?: string; unit?: string; quantity?: number; unitCost?: number }) => {
      dispatch({
        type: "updated_material",
        payload: {
          taskId: taskId,
          materialId: material.id,
          materialName: updates.name ?? material.name,
          materialUnit: updates.unit ?? material.unit,
          materialQuantity: updates.quantity ?? material.quantity,
          materialUnitCost: updates.unitCost ?? material.unitCost,
        },
      });
    },
    [dispatch, material, taskId]
  );

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
    <div className="flex w-full items-center gap-4">
      {/* Material Name Input */}
      <div className="flex flex-1 items-center gap-2">
        <Package className="h-5 w-5" size={24} />
        <input
          className="w-full rounded-lg border p-2"
          type="text"
          placeholder="Name"
          value={material.name ?? ""}
          onChange={(e) => handleUpdateMaterial({ name: e.target.value })}
        />
      </div>

      {/* Material Unit Input */}
      <div className="flex flex-1 items-center gap-2">
        <Ruler className="h-5 w-5" size={24} />
        <input
          className="w-full rounded-lg border p-2"
          type="text"
          placeholder="Unit"
          value={material.unit ?? ""}
          onChange={(e) => handleUpdateMaterial({ unit: e.target.value })}
        />
      </div>

      {/* Material Quantity Input */}
      <div className="flex flex-1 items-center gap-2">
        <Hash className="h-5 w-5" size={24} />
        <input
          className="w-full rounded-lg border p-2"
          type="number"
          min="0"
          placeholder="Quantity"
          value={material.quantity ?? ""}
          onChange={(e) => handleUpdateMaterial({ quantity: e.target.value })}
        />
      </div>

      <p>x</p>

      {/* Material Unit Cost Input */}
      <div className="flex flex-1 items-center gap-2">
        <DollarSign className="h-5 w-5" size={24} />
        <input
          className="w-full rounded-lg border p-2"
          type="number"
          min="0"
          placeholder="Unit Cost"
          value={material.unitCost ?? 0}
          onChange={(e) => handleUpdateMaterial({ unitCost: e.target.value })}
        />
      </div>

      <p>=</p>

      {/* Material Cost */}
      <p className="font-semibold text-blue-600">${formatToDecimalCost(material.cost, 2)}</p>

      {/* Delete Button */}
      <button
        className="flex-shrink-0 rounded-full p-2 hover:bg-slate-200"
        onClick={handleRemoveMaterial}
      >
        <Trash2 className="h-5 w-5" size={24} color="red" />
      </button>
    </div>
  );
}

function AddMaterial({ taskId, hasMaterial }: AddMaterialProps) {
  const dispatch = useTasksDispatch();

  // Add material
  const handleAddMaterial = () => {
    dispatch({
      type: "added_material",
      payload: {
        taskId: taskId,
      },
    });
  };

  return (
    <div
      className={clsx("flex justify-center gap-4", {
        "mt-4": hasMaterial,
        "mt-0": !hasMaterial,
      })}
    >
      {hasMaterial ? (
        <button
          className="rounded-full border-2 border-yellow-500 bg-yellow-500 p-2 text-xl text-white hover:bg-yellow-400"
          onClick={handleAddMaterial}
        >
          <Plus className="h-5 w-5" size={24} />
        </button>
      ) : (
        <button
          className="flex items-center gap-2 rounded-full border-2 border-yellow-500 bg-yellow-500 px-4 py-2 text-xl text-white hover:bg-yellow-400"
          onClick={handleAddMaterial}
        >
          <Plus className="h-5 w-5" size={24} />
          Material
        </button>
      )}
    </div>
  );
}
