"use client";

import { ArrowBigRightDash, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

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
  const bottomRef = useRef(null);

  return (
    <div className="container flex flex-col items-center justify-center px-8 py-10">
      <AddTask bottomRef={bottomRef} />
      <TaskList />

      {/* Navigation */}
      <div className="mt-10 flex w-full justify-center gap-6">
        {tasks && tasks.length > 0 && (
          <Link className="btn-icon" href="/profit">
            <ArrowBigRightDash size={22} />
          </Link>
        )}
      </div>

      {/* Scroll to bottom */}
      <div ref={bottomRef} />
    </div>
  );
}

function TaskList() {
  const tasks = useTasks();

  if (!tasks) {
    return;
  }

  return (
    <div className="w-full">
      <ul>
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
    <div className="relative mb-6 rounded-xl border border-neutral-700 bg-neutral-200 p-5 shadow-md transition-all hover:shadow-xl dark:bg-neutral-800">
      <div className="flex items-center justify-between">
        {/* Task Name Input */}
        <div className="flex w-full items-center gap-4">
          <label className="flex flex-1 items-center gap-3 text-xl font-semibold">
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
            className="rounded-full p-2 transition-all duration-200 hover:bg-neutral-400 dark:hover:bg-neutral-600"
            onClick={handleToggleTask}
          >
            {task.isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </button>

          {/* Delete Button */}
          <button
            className="rounded-full p-2 transition-all duration-200 hover:bg-red-300 dark:hover:bg-red-700"
            onClick={handleRemoveTask}
          >
            <Trash2 className="h-6 w-6 text-red-500" />
          </button>
        </div>
      </div>

      {task.isOpen && (
        <>
          <hr className="my-4 border-neutral-700" />

          {/* Scrollable Content */}
          <div className="scrollbar-thin max-h-[60vh] overflow-y-auto p-4">
            {task.materials.length > 0 && (
              <>
                <Materials taskId={task.id} materials={task.materials} />
                {(task.labors.length > 0 || task.additional.length > 0) && (
                  <hr className="mb-4 mt-6 border-neutral-700" />
                )}
              </>
            )}
            {task.labors.length > 0 && (
              <>
                <Labors taskId={task.id} labors={task.labors} />
                {task.additional.length > 0 && <hr className="mb-4 mt-6 border-neutral-700" />}
              </>
            )}
            {task.additional.length > 0 && (
              <>
                <Additional taskId={task.id} additional={task.additional} />
              </>
            )}
          </div>

          {/* Sticky Bottom Bar */}
          <div className="sticky bottom-0 left-0 flex w-full flex-col items-center rounded-xl bg-neutral-300 p-4 shadow-md dark:bg-neutral-700 sm:flex-row sm:justify-between">
            <div className="mb-2 flex items-center gap-2 text-lg font-bold sm:mb-0">
              <p>Total:</p>
              <p className="text-blue-500">${formatToDecimalCost(task.totalCost, 2)}</p>
            </div>
            <AddItemButton taskId={task.id} />
          </div>
        </>
      )}
    </div>
  );
}

function AddTask({ bottomRef }: { bottomRef: React.RefObject<HTMLDivElement | null> }) {
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

    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mb-8 w-full max-w-md">
      {/* Container for input + button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          className="input-field flex-1 text-center"
          placeholder="Enter task name..."
          value={taskName}
          onChange={handleNameChange}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          onClick={handleAddTask}
        >
          <Plus className="h-5 w-5" />
          Add Task
        </motion.button>
      </div>

      {/* Error message below the row */}
      {hasError && <p className="mt-2 text-sm !text-red-500">Task name cannot be empty.</p>}
    </div>
  );
}
