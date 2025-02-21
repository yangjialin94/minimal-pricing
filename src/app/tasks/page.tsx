"use client";

import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
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
  const tasks = useTasks();

  return (
    <div className="container flex min-h-screen flex-col items-center px-4 py-10 sm:px-6 md:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-3xl font-bold dark:text-gray-100"
      >
        Tasks
      </motion.h1>

      <TaskList />
      <AddTask />

      {/* Navigation */}
      <div className="mt-10 flex w-full justify-center gap-6">
        <Link className="btn-secondary" href="/">
          <ArrowBigLeftDash size={22} /> Back to Home
        </Link>
        {tasks && tasks.length > 0 && (
          <Link className="btn-primary" href="/profit">
            Calculate Profit <ArrowBigRightDash size={22} />
          </Link>
        )}
      </div>
    </div>
  );
}

function TaskList() {
  const tasks = useTasks();

  if (!tasks) {
    return;
  }

  return (
    <div className="w-full max-w-xl px-4 sm:max-w-3xl sm:px-6 md:px-8">
      <ul className="space-y-6">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TaskComponent task={task} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function TaskComponent({ task }: { task: Task }) {
  const dispatch = useTasksDispatch();

  const handleToggleTask = () => {
    dispatch({
      type: "toggled_task",
      payload: { taskId: task.id },
    });
  };

  const handleUpdateTask = useCallback(
    (name: string) => {
      dispatch({
        type: "updated_task",
        payload: {
          taskId: task.id,
          taskName: name,
        },
      });
    },
    [dispatch, task.id]
  );

  const handleRemoveTask = useCallback(() => {
    dispatch({
      type: "removed_task",
      payload: {
        taskId: task.id,
      },
    });
  }, [dispatch, task.id]);

  return (
    <div className="relative mb-6 rounded-xl border bg-white p-5 shadow-md transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        {/* Task Name Input */}
        <div className="flex w-full items-center gap-4">
          <label className="flex flex-1 items-center gap-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            <span className="hidden sm:flex">📂</span>
            <input
              className="input-field"
              type="text"
              placeholder="Task Name"
              value={task.name}
              onChange={(e) => handleUpdateTask(e.target.value)}
            />
          </label>
        </div>
        <div className="ml-4 flex items-center gap-2">
          {/* Toggle Button */}
          <button
            className="rounded-full p-2 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={handleToggleTask}
          >
            {task.isOpen ? (
              <ChevronUp className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Delete Button */}
          <button
            className="rounded-full p-2 transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-700/20"
            onClick={handleRemoveTask}
          >
            <Trash2 className="h-6 w-6 text-red-500" />
          </button>
        </div>
      </div>

      {task.isOpen && (
        <>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />

          {/* Scrollable Content */}
          <div className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 max-h-[60vh] overflow-y-auto p-4">
            {task.materials.length > 0 && (
              <>
                <Materials taskId={task.id} materials={task.materials} />
                <hr className="my-4 border-gray-300 dark:border-gray-600" />
              </>
            )}
            {task.labors.length > 0 && (
              <>
                <Labors taskId={task.id} labors={task.labors} />
                <hr className="my-4 border-gray-300 dark:border-gray-600" />
              </>
            )}
            {task.additional.length > 0 && (
              <>
                <Additional taskId={task.id} additional={task.additional} />
                <hr className="my-4 border-gray-300 dark:border-gray-600" />
              </>
            )}
          </div>

          {/* Sticky Bottom Bar */}
          <div className="sticky bottom-0 left-0 flex w-full flex-col items-center rounded-xl bg-gray-100 p-4 shadow-md sm:flex-row sm:justify-between dark:bg-gray-700">
            <div className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-800 sm:mb-0 dark:text-gray-200">
              <p>Total:</p>
              <p className="text-blue-600 dark:text-blue-400">
                ${formatToDecimalCost(task.totalCost, 2)}
              </p>
            </div>
            <AddItemButton taskId={task.id} />
          </div>
        </>
      )}
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
    <div className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
      {/* Add Task */}
      <div className="relative flex w-full max-w-md flex-col items-center">
        <input
          className="input-field text-center"
          placeholder="Enter task name..."
          value={taskName}
          onChange={handleNameChange}
        />
        {hasError && <p className="mt-2 text-sm text-red-500">Task name cannot be empty.</p>}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary mt-2 w-full sm:w-auto"
          onClick={handleAddTask}
        >
          <Plus className="h-5 w-5" />
          Add Task
        </motion.button>
      </div>
    </div>
  );
}
