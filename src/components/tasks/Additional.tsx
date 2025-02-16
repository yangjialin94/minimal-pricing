import clsx from "clsx";
import { DollarSign, HousePlus, Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";

import { useTasksDispatch } from "@/hooks/useTasksDispatch";
import { formatToDecimalCost } from "@/lib/format";
import { Additional as AdditionalType } from "@/types";

interface AdditionalProps {
  taskId: number;
  additional: AdditionalType[];
}

interface AdditionalListProps {
  taskId: number;
  additional: AdditionalType[];
}

interface AdditionalComponentProps {
  taskId: number;
  additional: AdditionalType;
}

interface AddAdditionalProps {
  taskId: number;
  hasAdditional: boolean;
}

export default function Additional({ taskId, additional }: AdditionalProps) {
  const hasAdditional = additional.length > 0;

  return (
    <div>
      {hasAdditional && <h2 className="mb-4 text-center text-xl font-bold">Additional</h2>}
      <AdditionalList taskId={taskId} additional={additional} />
      <AddAdditional taskId={taskId} hasAdditional={hasAdditional} />
    </div>
  );
}

function AdditionalList({ taskId, additional }: AdditionalListProps) {
  return (
    <div className="flex w-full items-center gap-4">
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

  // Update additional
  const handleUpdateAdditional = useCallback(
    (updates: { type?: string; cost?: number }) => {
      dispatch({
        type: "updated_additional",
        payload: {
          taskId: taskId,
          additionalId: additional.id,
          additionalType: updates.type ?? additional.type,
          additionalCost: updates.cost ?? additional.cost,
        },
      });
    },
    [dispatch, additional, taskId]
  );

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
    <div className="flex w-full items-center gap-4">
      {/* Additional Type Input */}
      <div className="flex flex-1 items-center gap-2">
        <HousePlus className="h-5 w-5" size={24} />
        <input
          className="w-full rounded-lg border p-2"
          type="text"
          placeholder="Type"
          value={additional.type ?? ""}
          onChange={(e) => handleUpdateAdditional({ type: e.target.value })}
        />
      </div>

      {/* Additional Cost Input */}
      <div className="flex flex-1 items-center gap-1">
        <DollarSign className="h-5 w-5" size={24} />
        <input
          className="w-full rounded-lg border p-2"
          type="number"
          min="0"
          placeholder="Cost"
          value={additional.cost ?? 0}
          onChange={(e) => handleUpdateAdditional({ cost: e.target.value })}
        />
      </div>

      <p>=</p>

      {/* Additional Cost */}
      <p className="font-semibold text-blue-600">${formatToDecimalCost(additional.cost, 2)}</p>

      {/* Delete Button */}
      <button
        className="flex-shrink-0 rounded-full p-2 hover:bg-slate-200"
        onClick={handleRemoveAdditional}
      >
        <Trash2 className="h-5 w-5" size={24} color="red" />
      </button>
    </div>
  );
}

function AddAdditional({ taskId, hasAdditional }: AddAdditionalProps) {
  const dispatch = useTasksDispatch();

  // Add additional
  const handleAddAdditional = () => {
    dispatch({
      type: "added_additional",
      payload: {
        taskId: taskId,
      },
    });
  };

  return (
    <div
      className={clsx("flex justify-center gap-4", {
        "mt-4": hasAdditional,
        "mt-0": !hasAdditional,
      })}
    >
      {hasAdditional ? (
        <button
          className="rounded-full border-2 border-slate-500 bg-slate-500 p-2 text-xl text-white hover:bg-slate-400"
          onClick={handleAddAdditional}
        >
          <Plus className="h-5 w-5" size={24} />
        </button>
      ) : (
        <button
          className="flex items-center gap-2 rounded-full border-2 border-slate-500 bg-slate-500 px-4 py-2 text-xl text-white hover:bg-slate-400"
          onClick={handleAddAdditional}
        >
          <Plus className="h-5 w-5" size={24} />
          Additional
        </button>
      )}
    </div>
  );
}
