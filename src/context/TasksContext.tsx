"use client";

import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task, TaskAction } from "@/types";

import { useProject, useProjectDispatch } from "./ProjectContext";

// Create Contexts
export const TasksContext = createContext<Task[] | null>(null);
export const TasksDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);

// Create Provider
export function TasksProvider({ children }: { children: ReactNode }) {
  // Load from project context
  const project = useProject();
  const projectDispatch = useProjectDispatch();

  const [tasks, dispatch] = useReducer(tasksReducer, project.tasks);

  useEffect(() => {
    projectDispatch({ type: "updated_tasks", payload: { tasks } });
  }, [projectDispatch, tasks]);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// Custom Hook - Read tasks
export function useTasks() {
  return useContext(TasksContext);
}

// Custom Hook - Dispatch tasks
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

// Reducer function
function tasksReducer(tasks: Task[], action: TaskAction) {
  switch (action.type) {
    case "added_task":
      return [
        ...tasks,
        { id: uuidv4(), name: action.payload.taskName, materials: [], labors: [], additional: [] },
      ];

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
                  name: "",
                  price: 0,
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
                      price: Number(action.payload.materialPrice),
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
                  duration: "",
                  price: 0,
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
                      duration: action.payload.laborDuration,
                      price: Number(action.payload.laborPrice),
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

    case "added_additional":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              additional: [
                ...task.additional,
                {
                  id: uuidv4(),
                  name: "",
                  price: 0,
                },
              ],
            }
          : task
      );

    case "updated_additional":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              additional: task.additional.map((add) =>
                add.id === action.payload.additionalId
                  ? {
                      ...add,
                      name: action.payload.additionalName,
                      price: Number(action.payload.additionalPrice),
                    }
                  : add
              ),
            }
          : task
      );

    case "removed_additional":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              additional: task.additional.filter((add) => add.id !== action.payload.additionalId),
            }
          : task
      );

    default:
      return tasks;
  }
}
