"use client";

import clsx from "clsx";
import { ArrowBigLeftDash, ArrowBigRightDash, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import AddItemButton from "@/components/tasks/AddItemButton";
import Additional from "@/components/tasks/Additional";
import Labors from "@/components/tasks/Labors";
import Materials from "@/components/tasks/Materials";
import { useTasks } from "@/hooks/useTasks";
import { useTasksDispatch } from "@/hooks/useTasksDispatch";
import { formatToDecimalCost } from "@/lib/format";
import { Task } from "@/types";

export default function Tasks() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center">
      <h1 className="mb-10 text-center text-2xl font-bold">Cost Overview</h1>

      <TaskList />
      <AddTask />

      {/* Navigation */}
      <div className="mt-10 flex gap-6">
        <Link
          className="flex items-center gap-2 rounded-md border px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100"
          href="/"
        >
          <ArrowBigLeftDash size={22} /> Back to Home
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md border px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100"
          href="/profit"
        >
          Calculate Profit <ArrowBigRightDash size={22} />
        </Link>
      </div>
    </div>
  );
}

function TaskList() {
  const tasks = useTasks();

  return (
    <div className="w-full px-8">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskComponent task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function TaskComponent({ task }: { task: Task }) {
  const dispatch = useTasksDispatch();

  // Update task
  const handleUpdateTask = useCallback(
    (id: number, name: string) => {
      dispatch({
        type: "updated_task",
        payload: {
          taskId: id,
          taskName: name,
        },
      });
    },
    [dispatch]
  );

  // Remove task
  const handleRemoveTask = useCallback(() => {
    dispatch({
      type: "removed_task",
      payload: {
        taskId: task.id,
      },
    });
  }, [dispatch, task.id]);

  return (
    <div
      key={task.id}
      className="relative mb-6 rounded-xl border bg-white p-5 shadow-md transition-all hover:shadow-xl"
    >
      {/* Task Header */}
      <div className="flex items-center gap-4">
        <label className="flex flex-1 items-center gap-3 text-xl font-semibold text-gray-800">
          📂
          <input
            className="w-full rounded-md border px-3 py-2 text-lg text-gray-700 shadow-sm transition-all focus:border-blue-400 focus:ring focus:ring-blue-200"
            type="text"
            placeholder="Task Name"
            value={task.name}
            onChange={(e) => handleUpdateTask(task.id, e.target.value)}
          />
        </label>
        <button
          className="flex-shrink-0 rounded-full p-2 transition-all duration-200 hover:bg-red-100"
          onClick={handleRemoveTask}
        >
          <Trash2 className="h-6 w-6 text-red-500" />
        </button>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Scrollable Content (with a limited height) */}
      <div className="max-h-[60vh] overflow-y-auto p-4">
        {/* Materials */}
        {task.materials.length > 0 && (
          <>
            <Materials taskId={task.id} materials={task.materials} />
            <hr className="my-4 border-gray-300" />
          </>
        )}

        {/* Labors */}
        {task.labors.length > 0 && (
          <>
            <Labors taskId={task.id} labors={task.labors} />
            <hr className="my-4 border-gray-300" />
          </>
        )}

        {/* Additional */}
        {task.additional.length > 0 && (
          <>
            <Additional taskId={task.id} additional={task.additional} />
            <hr className="my-4 border-gray-300" />
          </>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 left-0 flex w-full flex-col items-center rounded-xl bg-gray-100 p-4 shadow-md sm:flex-row sm:justify-between">
        {/* Total Cost */}
        <div className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-800 sm:mb-0">
          <p>Total:</p>
          <p className="text-blue-600">${formatToDecimalCost(task.totalCost, 2)}</p>
        </div>

        {/* Add Item Button */}
        <AddItemButton taskId={task.id} />
      </div>
    </div>
  );
}

function AddTask() {
  const [taskName, setTaskName] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const dispatch = useTasksDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasError) setHasError(false);
    setTaskName(e.target.value);
  };

  // Add task
  const handleAddTask = () => {
    if (!taskName.trim()) {
      setTaskName("");
      setHasError(true);
      return;
    }

    setTaskName("");
    dispatch({
      type: "added_task",
      payload: { taskName: taskName.trim() },
    });
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      {/* Task Input */}
      <div className="relative w-full max-w-lg">
        <input
          className={clsx(
            "w-full rounded-md border px-4 py-3 text-lg shadow-md transition-all focus:border-blue-400 focus:ring focus:ring-blue-200",
            {
              "border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-200":
                hasError,
              "border-gray-300 text-gray-700": !hasError,
            }
          )}
          placeholder="Enter task name..."
          value={taskName}
          onChange={handleNameChange}
        />
        {hasError && <p className="mt-2 text-sm text-red-500">Task name cannot be empty.</p>}
      </div>

      {/* Add Task Button */}
      <button
        className="mt-4 flex items-center gap-2 rounded-md border-2 border-blue-500 bg-blue-500 px-5 py-3 text-lg font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-400 hover:shadow-md"
        onClick={handleAddTask}
      >
        <Plus className="h-5 w-5" />
        Add Task
      </button>
    </div>
  );
}
