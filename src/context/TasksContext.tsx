"use client";

import { createContext, ReactNode, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { useProject } from "@/hooks/useProject";
import { useProjectDispatch } from "@/hooks/useProjectDispatch";
import { Task, TaskAction } from "@/types";

// Create Contexts
export const TasksContext = createContext<Task[] | null>(null);
export const TasksDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);

// Create Provider
export function TasksProvider({ children }: { children: ReactNode }) {
  // Load from project context
  const project = useProject();
  const projectDispatch = useProjectDispatch();

  const [tasks, dispatch] = useReducer(tasksReducer, project.tasks);

  // Update project level when detect tasks level changes
  useEffect(() => {
    projectDispatch({ type: "updated_tasks", payload: { tasks } });
  }, [projectDispatch, tasks]);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// Reducer function
function tasksReducer(tasks: Task[], action: TaskAction) {
  switch (action.type) {
    case "added_task": {
      return [
        ...tasks,
        {
          id: uuidv4(),
          name: action.payload.taskName,
          materials: [],
          labors: [],
          additional: [],
          totalCost: 0,
          profitMargin: 0.0,
          totalPrice: 0,
        },
      ];
    }

    case "updated_task": {
      return tasks.map((task) =>
        task.id === action.payload.taskId ? { ...task, name: action.payload.taskName } : task
      );
    }

    case "removed_task": {
      return tasks.filter((task) => task.id !== action.payload.taskId);
    }

    case "toggled_task": {
      return tasks.map((task) =>
        task.id === action.payload.taskId ? { ...task, isOpen: !task.isOpen } : task
      );
    }

    case "added_material": {
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              materials: [
                ...task.materials,
                {
                  id: uuidv4(),
                  name: "",
                  unit: "",
                  quantity: 1,
                  materialUnitCost: 0,
                  cost: 0,
                },
              ],
            }
          : task
      );
    }

    case "updated_material": {
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              materials: task.materials.map((material) =>
                material.id === action.payload.materialId
                  ? {
                      ...material,
                      name: action.payload.materialName,
                      unit: action.payload.materialUnit,
                      quantity: Number(action.payload.materialQuantity),
                      unitCost: Number(action.payload.materialUnitCost),
                      cost:
                        Number(action.payload.materialQuantity) *
                        Number(action.payload.materialUnitCost),
                    }
                  : material
              ),
              totalCost:
                task.totalCost -
                (task.materials.find((material) => material.id === action.payload.materialId)
                  ?.cost || 0) +
                Number(action.payload.materialQuantity) * Number(action.payload.materialUnitCost),
            }
          : task
      );
    }

    case "removed_material": {
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              materials: task.materials.filter(
                (material) => material.id !== action.payload.materialId
              ),
              totalCost:
                task.totalCost -
                (task.materials.find((material) => material.id === action.payload.materialId)
                  ?.cost || 0),
            }
          : task
      );
    }

    case "added_labor": {
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              labors: [
                ...task.labors,
                {
                  id: uuidv4(),
                  role: "",
                  unit: "",
                  quantity: 1,
                  unitCost: "",
                  cost: 0,
                },
              ],
            }
          : task
      );
    }

    case "updated_labor": {
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              labors: task.labors.map((labor) =>
                labor.id === action.payload.laborId
                  ? {
                      ...labor,
                      role: action.payload.laborRole,
                      unit: action.payload.laborUnit,
                      quantity: Number(action.payload.laborQuantity),
                      unitCost: Number(action.payload.laborUnitCost),
                      cost:
                        Number(action.payload.laborQuantity) * Number(action.payload.laborUnitCost),
                    }
                  : labor
              ),
              totalCost:
                task.totalCost -
                (task.labors.find((labor) => labor.id === action.payload.laborId)?.cost || 0) +
                Number(action.payload.laborQuantity) * Number(action.payload.laborUnitCost),
            }
          : task
      );
    }

    case "removed_labor": {
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              labors: task.labors.filter((labor) => labor.id !== action.payload.laborId),
              totalCost:
                task.totalCost -
                (task.labors.find((labor) => labor.id === action.payload.laborId)?.cost || 0),
            }
          : task
      );
    }

    case "added_additional": {
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              additional: [
                ...task.additional,
                {
                  id: uuidv4(),
                  type: "",
                  cost: 0,
                },
              ],
            }
          : task
      );
    }

    case "updated_additional": {
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? (() => {
              return {
                ...task,
                additional: task.additional.map((add) =>
                  add.id === action.payload.additionalId
                    ? {
                        ...add,
                        type: action.payload.additionalType,
                        cost: Number(action.payload.additionalCost),
                      }
                    : add
                ),
                totalCost:
                  task.totalCost -
                  (task.additional.find((add) => add.id === action.payload.additionalId)?.cost ||
                    0) +
                  Number(action.payload.additionalCost),
              };
            })()
          : task
      );
    }

    case "removed_additional": {
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              additional: task.additional.filter((add) => add.id !== action.payload.additionalId),
              totalCost:
                task.totalCost -
                (task.additional.find((add) => add.id === action.payload.additionalId)?.cost || 0),
            }
          : task
      );
    }

    default: {
      return tasks;
    }
  }
}
