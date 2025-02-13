import clsx from "clsx";
import { DollarSign, HousePlus, Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";

import { useTasksDispatch } from "@/context/TasksContext";
import { Additional as AdditionalType } from "@/types";

function AddAdditional({ taskId, hasAdditional }: { taskId: number; hasAdditional: boolean }) {
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
          <Plus />
        </button>
      ) : (
        <button
          className="flex items-center gap-2 rounded-full border-2 border-slate-500 bg-slate-500 px-4 py-2 text-xl text-white hover:bg-slate-400"
          onClick={handleAddAdditional}
        >
          <Plus />
          Additional
        </button>
      )}
    </div>
  );
}

function AdditionalComponent({
  taskId,
  additional,
}: {
  taskId: number;
  additional: AdditionalType;
}) {
  const dispatch = useTasksDispatch();

  // Update additional
  const handleUpdateAdditional = useCallback(
    (updates: { name?: string; price?: number }) => {
      dispatch({
        type: "updated_additional",
        payload: {
          taskId: taskId,
          additionalId: additional.id,
          additionalName: updates.name ?? additional.name,
          additionalPrice: updates.price ?? additional.price,
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
      {/* Additional Name Input */}
      <div className="flex flex-1 items-center gap-2">
        <HousePlus />
        <input
          className="w-full rounded-lg border p-2"
          type="text"
          placeholder="Name"
          value={additional.name ?? ""}
          onChange={(e) => handleUpdateAdditional({ name: e.target.value })}
        />
      </div>

      {/* Additional Price Input */}
      <div className="flex flex-1 items-center gap-1">
        <DollarSign />
        <input
          className="w-full rounded-lg border p-2"
          type="number"
          min="0"
          placeholder="Price"
          value={additional.price ?? 0}
          onChange={(e) => handleUpdateAdditional({ price: e.target.value })}
        />
      </div>

      {/* Delete Button */}
      <button
        className="flex-shrink-0 rounded-full p-2 hover:bg-slate-200"
        onClick={handleRemoveAdditional}
      >
        <Trash2 />
      </button>
    </div>
  );
}

function AdditionalList({ taskId, additional }: { taskId: number; additional: AdditionalType[] }) {
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

export default function Additional({
  taskId,
  additional,
}: {
  taskId: number;
  additional: AdditionalType[];
}) {
  const hasAdditional = additional.length > 0;

  return (
    <div>
      {hasAdditional && <h2 className="mb-4 text-center text-xl font-bold">Additional</h2>}
      <AdditionalList taskId={taskId} additional={additional} />
      <AddAdditional taskId={taskId} hasAdditional={hasAdditional} />
    </div>
  );
}
