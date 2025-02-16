import clsx from "clsx";
import { DollarSign, Pickaxe, Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";

import { useTasksDispatch } from "@/hooks/useTasksDispatch";
import { formatToDecimalCost } from "@/lib/format";
import { Labor } from "@/types";

interface LaborsProps {
  taskId: number;
  labors: Labor[];
}

interface LaborListProps {
  taskId: number;
  labors: Labor[];
}

interface LaborComponentProps {
  taskId: number;
  labor: Labor;
}

interface AddLaborProps {
  taskId: number;
  hasLabor: boolean;
}

export default function Labors({ taskId, labors }: LaborsProps) {
  const hasLabor = labors.length > 0;

  return (
    <div>
      {hasLabor && <h2 className="mb-4 text-center text-xl font-bold">Labors</h2>}
      <LaborList taskId={taskId} labors={labors} />
      <AddLabor taskId={taskId} hasLabor={hasLabor} />
    </div>
  );
}

function LaborList({ taskId, labors }: LaborListProps) {
  return (
    <div className="flex w-full items-center gap-4">
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

  // Update labor
  const handleUpdateLabor = useCallback(
    (updates: { role?: string; unit?: string; quantity?: number; unitCost?: number }) => {
      dispatch({
        type: "updated_labor",
        payload: {
          taskId: taskId,
          laborId: labor.id,
          laborRole: updates.role ?? labor.role,
          laborUnit: updates.unit ?? labor.unit,
          laborQuantity: updates.quantity ?? labor.quantity,
          laborUnitCost: updates.unitCost ?? labor.unitCost,
        },
      });
    },
    [dispatch, labor, taskId]
  );

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
    <div className="flex w-full items-center gap-4">
      {/* Labor Role Input */}
      <div className="flex flex-1 items-center gap-2">
        <Pickaxe className="h-5 w-5" size={24} />
        <input
          className="w-full rounded-lg border p-2"
          type="text"
          placeholder="Role"
          value={labor.role ?? ""}
          onChange={(e) => handleUpdateLabor({ role: e.target.value })}
        />
      </div>

      {/* Labor Unit Cost Input */}
      <div className="flex flex-1 items-center gap-2">
        <DollarSign className="h-5 w-5" size={24} />
        <input
          className="w-full rounded-lg border p-2"
          type="number"
          min="0"
          placeholder="Unit Cost"
          value={labor.unitCost ?? 0}
          onChange={(e) => handleUpdateLabor({ unitCost: e.target.value })}
        />
      </div>

      <p>/</p>

      {/* Labor Unit Input */}
      <div className="flex flex-1 items-center gap-2">
        <input
          className="w-full rounded-lg border p-2"
          type="text"
          placeholder="Unit"
          value={labor.unit ?? ""}
          onChange={(e) => handleUpdateLabor({ unit: e.target.value })}
        />
      </div>

      <p>x</p>

      {/* Labor Quantity Input */}
      <div className="flex flex-1 items-center gap-2">
        <input
          className="w-full rounded-lg border p-2"
          type="number"
          min="0"
          placeholder="Quantity"
          value={labor.quantity ?? ""}
          onChange={(e) => handleUpdateLabor({ quantity: e.target.value })}
        />
      </div>

      <p>=</p>

      {/* Labor Cost */}
      <p className="font-semibold text-blue-600">${formatToDecimalCost(labor.cost, 2)}</p>

      {/* Delete Button */}
      <button
        className="flex-shrink-0 rounded-full p-2 hover:bg-slate-200"
        onClick={handleRemoveLabor}
      >
        <Trash2 className="h-5 w-5" size={24} color="red" />
      </button>
    </div>
  );
}

function AddLabor({ taskId, hasLabor }: AddLaborProps) {
  const dispatch = useTasksDispatch();

  // Add labor
  const handleAddLabor = () => {
    dispatch({
      type: "added_labor",
      payload: {
        taskId: taskId,
      },
    });
  };

  return (
    <div
      className={clsx("flex justify-center gap-4", {
        "mt-4": hasLabor,
        "mt-0": !hasLabor,
      })}
    >
      {hasLabor ? (
        <button
          className="rounded-full border-2 border-green-500 bg-green-500 p-2 text-xl text-white hover:bg-green-400"
          onClick={handleAddLabor}
        >
          <Plus className="h-5 w-5" size={24} />
        </button>
      ) : (
        <button
          className="flex items-center gap-2 rounded-full border-2 border-green-500 bg-green-500 px-4 py-2 text-xl text-white hover:bg-green-400"
          onClick={handleAddLabor}
        >
          <Plus className="h-5 w-5" size={24} />
          Labor
        </button>
      )}
    </div>
  );
}
