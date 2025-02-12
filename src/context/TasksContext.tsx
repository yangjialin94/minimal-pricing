"use client";

import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "@/types";

type TaskAction =
  | { type: "added_task"; payload: { taskName: string } }
  | { type: "updated_task"; payload: { taskId: number; taskName: string } }
  | { type: "removed_task"; payload: { taskId: number } }
  | {
      type: "added_material";
      payload: {
        taskId: number;
        materialName: string;
        materialPrice: number;
      };
    }
  | {
      type: "updated_material";
      payload: {
        taskId: number;
        materialId: number;
        materialName: string;
        materialPrice: number;
      };
    }
  | { type: "removed_material"; payload: { taskId: number; materialId: number } }
  | { type: "added_labor"; payload: { taskId: string; laborCost: number } }
  | {
      type: "updated_labor";
      payload: {
        taskId: number;
        laborId: number;
        laborCost: number;
      };
    }
  | { type: "removed_labor"; payload: { taskId: number; laborId: number } };

// Create Contexts
export const TasksContext = createContext<Task[] | null>(null);
export const TasksDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);

// Create Provider
export function TasksProvider({ children }: { children: ReactNode }) {
  // Load from sessionStorage
  const getSessionTasks = () => {
    if (typeof window !== "undefined") {
      const storedTasks = sessionStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
  };

  const [tasks, dispatch] = useReducer(tasksReducer, [], getSessionTasks);

  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks: Task[], action: TaskAction) {
  switch (action.type) {
    case "added_task":
      return [...tasks, { id: uuidv4(), name: action.payload.taskName, materials: [], labors: [] }];

    case "updated_task":
      return tasks.map((task) =>
        task.id === action.payload.taskId ? { ...task, name: action.payload.taskName } : task
      );

    case "removed_task":
      return tasks.filter((task) => task.id !== action.payload.taskId);

    case "added_material":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              materials: [
                ...task.materials,
                {
                  id: uuidv4(),
                  name: action.payload.materialName,
                  price: action.payload.materialPrice,
                },
              ],
            }
          : task
      );

    case "updated_material":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              materials: task.materials.map((material) =>
                material.id === action.payload.materialId
                  ? {
                      ...material,
                      name: action.payload.materialName,
                      price: action.payload.materialPrice,
                    }
                  : material
              ),
            }
          : task
      );

    case "removed_material":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              materials: task.materials.filter(
                (material) => material.id !== action.payload.materialId
              ),
            }
          : task
      );

    case "added_labor":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              labors: [
                ...task.labors,
                {
                  id: uuidv4(),
                  cost: action.payload.laborCost,
                },
              ],
            }
          : task
      );

    case "updated_labor":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              labors: task.labors.map((labor) =>
                labor.id === action.payload.laborId
                  ? {
                      ...labor,
                      cost: action.payload.laborCost,
                    }
                  : labor
              ),
            }
          : task
      );

    case "removed_labor":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              labors: task.labors.filter((labor) => labor.id !== action.payload.laborId),
            }
          : task
      );

    default:
      return tasks;
  }
}
