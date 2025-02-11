"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { Task } from "@/types";

type TaskAction =
  | { type: "added_task"; payload: { name: string } }
  | { type: "updated_task"; payload: { name: string } }
  | { type: "removed_task"; payload: { id: number } }
  | { type: "added_material"; payload: { taskId: number } }
  | {
      type: "updated_material";
      payload: {
        taskId: number;
        materialId: number;
        name: string;
        unitCount: number;
        pricePerUnit: number;
      };
    }
  | { type: "removed_material"; payload: { taskId: number; materialId: number } }
  | { type: "added_labor"; payload: { taskId: string } }
  | {
      type: "updated_labor";
      payload: {
        taskId: number;
        laborId: number;
        peopleCount: number;
        daysCount: number;
        dailyRatePerWorker: number;
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
      return [...tasks, { id: Date.now(), name: action.payload.name, materials: [], labors: [] }];

    case "updated_task":
      return tasks.map((task) =>
        task.id === action.payload.id ? { ...task, name: action.payload.name } : task
      );

    case "removed_task":
      return tasks.filter((task) => task.id !== action.payload.id);

    case "added_material":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              materials: [
                ...task.materials,
                {
                  id: Date.now(),
                  name: "",
                  unitCount: 1,
                  pricePerUnit: 0,
                  totalPrice: 0,
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
                      name: action.payload.name,
                      unitCount: action.payload.unitCount,
                      pricePerUnit: action.payload.pricePerUnit,
                      totalPrice: action.payload.unitCount * action.payload.pricePerUnit,
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
                  id: Date.now(),
                  peopleCount: 1,
                  daysCount: 1,
                  dailyRatePerWorker: 0,
                  totalPrice: 0,
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
                      peopleCount: action.payload.peopleCount,
                      daysCount: action.payload.daysCount,
                      dailyRatePerWorker: action.payload.dailyRatePerWorker,
                      totalPrice:
                        action.payload.peopleCount *
                        action.payload.daysCount *
                        action.payload.dailyRatePerWorker,
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
