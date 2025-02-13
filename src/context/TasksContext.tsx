"use client";

import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "@/types";

const TESTING_TASKS = [
  {
    id: uuidv4(),
    name: "Flooring",
    materials: [
      { id: uuidv4(), name: "Hardwood Planks", price: 3200 },
      { id: uuidv4(), name: "Adhesive", price: 150 },
      { id: uuidv4(), name: "Underlayment", price: 250 },
    ],
    labors: [
      { id: uuidv4(), name: "Installation (3 days)", price: 1200 },
      { id: uuidv4(), name: "Finishing & Cleanup", price: 350 },
    ],
    additional: [
      { id: uuidv4(), name: "Permit Fee", price: 100 },
      { id: uuidv4(), name: "Inspection", price: 75 },
    ],
  },
  {
    id: uuidv4(),
    name: "Painting",
    materials: [
      { id: uuidv4(), name: "Interior Paint (5 gallons)", price: 250 },
      { id: uuidv4(), name: "Paint Rollers & Brushes", price: 40 },
      { id: uuidv4(), name: "Painter's Tape", price: 25 },
    ],
    labors: [
      { id: uuidv4(), name: "Wall Prep & Priming (1 day)", price: 500 },
      { id: uuidv4(), name: "Painting (2 days)", price: 750 },
    ],
    additional: [{ id: uuidv4(), name: "Permit Fee", price: 60 }],
  },
  {
    id: uuidv4(),
    name: "Tile Installation",
    materials: [
      { id: uuidv4(), name: "Ceramic Tiles (200 sq ft)", price: 1800 },
      { id: uuidv4(), name: "Tile Adhesive & Grout", price: 300 },
      { id: uuidv4(), name: "Spacers & Tools", price: 100 },
    ],
    labors: [
      { id: uuidv4(), name: "Tile Cutting & Layout (1 day)", price: 400 },
      { id: uuidv4(), name: "Installation & Grouting (2 days)", price: 1000 },
    ],
    additional: [],
  },
];

type TaskAction =
  | { type: "added_task"; payload: { taskName: string } }
  | { type: "updated_task"; payload: { taskId: number; taskName: string } }
  | { type: "removed_task"; payload: { taskId: number } }
  | {
      type: "added_material";
      payload: {
        taskId: number;
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
  | { type: "added_labor"; payload: { taskId: string } }
  | {
      type: "updated_labor";
      payload: {
        taskId: number;
        laborId: number;
        laborDuration: string;
        laborPrice: number;
      };
    }
  | { type: "removed_labor"; payload: { taskId: number; laborId: number } }
  | {
      type: "added_additional";
      payload: {
        taskId: number;
      };
    }
  | {
      type: "updated_additional";
      payload: {
        taskId: number;
        additionalId: number;
        additionalName: string;
        additionalPrice: number;
      };
    }
  | { type: "removed_additional"; payload: { taskId: number; additionalId: number } };

// Create Contexts
export const TasksContext = createContext<Task[] | null>(null);
export const TasksDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);

// Create Provider
export function TasksProvider({ children }: { children: ReactNode }) {
  // Load from sessionStorage
  const getSessionTasks = () => {
    if (typeof window !== "undefined") {
      const storedTasks = sessionStorage.getItem("tasks");
      // return storedTasks ? JSON.parse(storedTasks) : [];
      return storedTasks ? JSON.parse(storedTasks) : TESTING_TASKS; // TESTING ONLY: REMOVE IN PRODUCTION !!!
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
