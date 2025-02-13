"use client";

import clsx from "clsx";
import { ArrowBigRightDash, ClipboardList, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import Additional from "@/components/tasks/Additional";
import Labors from "@/components/tasks/Labors";
import Materials from "@/components/tasks/Materials";
import { useTasks, useTasksDispatch } from "@/context/TasksContext";
import { Task } from "@/types";

function AddTask() {
  const [taskName, setTaskName] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const dispatch = useTasksDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasError) {
      setHasError(false);
    }
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
      payload: {
        taskName: taskName.trim(),
      },
    });
  };

  return (
    <div className="mt-8 flex items-center gap-4">
      <input
        className={clsx("rounded-full border-2 px-4 py-2 text-xl focus:placeholder-transparent", {
          "border-red-500 placeholder-red-500": hasError,
          "border-slate-300": !hasError,
        })}
        placeholder="Task name"
        value={taskName}
        onChange={handleNameChange}
      />
      <button
        className="flex items-center gap-2 rounded-full border-2 border-blue-500 bg-blue-500 px-4 py-2 text-xl text-white hover:bg-blue-400"
        onClick={handleAddTask}
      >
        <Plus />
        Task
      </button>
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
    <div key={task.id} className="mb-6 rounded-lg border bg-white p-4 shadow-md">
      {/* Task */}
      <div className="flex w-full items-center gap-4">
        <label className="flex flex-1 items-center gap-4 text-xl">
          <ClipboardList />
          <input
            className="w-full rounded-lg border p-2"
            type="text"
            placeholder="Task Name"
            value={task.name}
            onChange={(e) => handleUpdateTask(task.id, e.target.value)}
          />
        </label>
        <button
          className="flex-shrink-0 rounded-full p-2 hover:bg-slate-200"
          onClick={handleRemoveTask}
        >
          <Trash2 />
        </button>
      </div>

      <hr className="my-4" />

      {/* Materials */}
      <Materials taskId={task.id} materials={task.materials} />

      <hr className="my-4" />

      {/* Labors */}
      <Labors taskId={task.id} labors={task.labors} />

      <hr className="my-4" />

      {/* Additional */}
      <Additional taskId={task.id} additional={task.additional} />
    </div>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const loadedTasks = useTasks();

  // Load tasks
  useEffect(() => {
    if (loadedTasks) {
      setTasks(loadedTasks);
    }
  }, [loadedTasks]);

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

export default function Tasks() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center">
      <h1 className="mb-12 text-center text-2xl font-bold">Pricing Calculator</h1>
      <TaskList />
      <AddTask />
      {/* Next Page Button */}
      <Link className="mt-12 flex-shrink-0 rounded-full p-2 hover:bg-slate-200" href="/margin">
        <ArrowBigRightDash size={30} />
      </Link>
    </div>
  );
}
