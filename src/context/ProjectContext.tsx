"use client";

import { createContext, ReactNode, useEffect, useReducer, useState } from "react";

import { calculateTotalCost } from "@/lib/calculation";
import { Project, ProjectAction } from "@/types";

interface ProjectProviderProps {
  initialProjectData: Project;
  children: ReactNode;
}

// Create Contexts
export const ProjectContext = createContext<Project | null>(null);
export const ProjectDispatchContext = createContext<React.Dispatch<ProjectAction> | null>(null);

// Create Provider
export function ProjectProvider({ initialProjectData, children }: ProjectProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getInitialData = () => {
    if (typeof window !== "undefined") {
      const storedProject = sessionStorage.getItem("project");
      if (storedProject) {
        try {
          const parsedProject = JSON.parse(storedProject);
          return {
            ...initialProjectData,
            ...parsedProject,
          };
        } catch (error) {
          console.error("Error parsing project data from sessionStorage:", error);
          return initialProjectData;
        }
      }
    }
    return initialProjectData;
  };

  const [project, dispatch] = useReducer(projectReducer, initialProjectData, getInitialData);

  useEffect(() => {
    if (isClient && project) {
      sessionStorage.setItem(
        "project",
        JSON.stringify({
          ...project,
          totalCost: project.totalCost ?? 0,
          totalPrice: project.totalPrice ?? 0,
          profitMargin: project.profitMargin ?? 0,
          totalProfit: project.totalProfit ?? 0,
        })
      );
    }
  }, [project, isClient]);

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <ProjectContext.Provider value={project}>
      <ProjectDispatchContext.Provider value={dispatch}>{children}</ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}

// Reducer function
function projectReducer(project: Project, action: ProjectAction) {
  switch (action.type) {
    case "updated_user": {
      return {
        ...project,
        user: {
          ...project.user,
          name: action.payload.userName,
          phone: action.payload.userPhone,
          email: action.payload.userEmail,
        },
      };
    }

    case "updated_customer": {
      return {
        ...project,
        customer: {
          ...project.customer,
          name: action.payload.customerName,
          address: action.payload.customerAddress,
          phone: action.payload.customerPhone,
          email: action.payload.customerEmail,
        },
      };
    }

    case "updated_total_profit": {
      const newTotalPrice = project.totalCost + action.payload.totalProfit;
      const newProfitMargin =
        newTotalPrice > 0 ? ((newTotalPrice - project.totalCost) / newTotalPrice) * 100 : 0;

      const numberOfTasks = project.tasks.length;
      const profitPerTask = numberOfTasks > 0 ? action.payload.totalProfit / numberOfTasks : 0;

      // Calculate the total cost of non-zero cost tasks
      const nonZeroCostTasks = project.tasks.filter((task) => task.totalCost > 0);
      const totalCostOfNonZeroTasks = nonZeroCostTasks.reduce(
        (sum, task) => sum + task.totalCost,
        0
      );

      return {
        ...project,
        tasks: project.tasks.map((task) => {
          const taskTotalCost = task.totalCost ?? 0;
          let taskProfitMargin = task.profitMargin ?? 0;
          let taskTotalPrice = task.totalPrice ?? 0;
          let taskProfit = 0;

          if (action.payload.totalProfit === 0) {
            // If totalProfit is 0, each task should have totalPrice = totalCost
            taskTotalPrice = taskTotalCost;
            taskProfitMargin = 0;
          } else if (project.totalCost > 0) {
            // Normal Case: Weighted profit distribution based on task cost
            if (taskTotalCost > 0) {
              taskProfit = (taskTotalCost / totalCostOfNonZeroTasks) * action.payload.totalProfit;
            }
            taskTotalPrice = taskTotalCost + taskProfit;
            taskProfitMargin =
              taskTotalPrice > 0 ? ((taskTotalPrice - taskTotalCost) / taskTotalPrice) * 100 : 0;
          } else if (project.totalCost === 0 && action.payload.totalProfit > 0) {
            // Special Case: All Tasks Have 0 Cost ➝ Distribute profit evenly
            taskTotalPrice = profitPerTask;
            taskProfitMargin = 100;
          }

          // Prevent NaN or Infinity
          if (!isFinite(taskTotalPrice) || isNaN(taskTotalPrice)) {
            taskTotalPrice = 0;
          }

          return {
            ...task,
            totalCost: taskTotalCost,
            profitMargin: taskProfitMargin,
            totalPrice: taskTotalPrice,
          };
        }),
        profitMargin: newProfitMargin ?? 0,
        totalPrice: newTotalPrice ?? 0,
        totalProfit: action.payload.totalProfit,
      };
    }

    case "updated_tasks": {
      const newTotalCost =
        action.payload.tasks.length > 0 ? calculateTotalCost(action.payload.tasks) : 0;
      const newTotalPrice = newTotalCost + (project.totalProfit ?? 0);
      const newProfitMargin =
        newTotalPrice > 0 ? ((newTotalPrice - newTotalCost) / newTotalPrice) * 100 : 0;

      const numberOfTasks = action.payload.tasks.length;
      const profitPerTask = numberOfTasks > 0 ? project.totalProfit / numberOfTasks : 0;

      // Calculate the total cost of non-zero cost tasks
      const nonZeroCostTasks = action.payload.tasks.filter((task) => task.totalCost > 0);
      const totalCostOfNonZeroTasks = nonZeroCostTasks.reduce(
        (sum, task) => sum + task.totalCost,
        0
      );

      // Update each task
      const updatedTasks = action.payload.tasks.map((task) => {
        const taskTotalCost = task.totalCost ?? 0;
        let taskProfitMargin = task.profitMargin ?? 0;
        let taskTotalPrice = task.totalPrice ?? 0;
        let taskProfit = 0;

        if (newTotalCost > 0) {
          // Normal Case: Weighted profit distribution based on task cost
          if (taskTotalCost > 0) {
            taskProfit = (taskTotalCost / totalCostOfNonZeroTasks) * (project.totalProfit ?? 0);
          }
          taskTotalPrice = taskTotalCost + taskProfit;
          taskProfitMargin =
            taskTotalPrice > 0 ? ((taskTotalPrice - taskTotalCost) / taskTotalPrice) * 100 : 0;
        } else if (newTotalCost === 0 && project.totalProfit > 0) {
          // Special Case: All Tasks Have 0 Cost -> Distribute profit evenly
          taskTotalPrice = profitPerTask;
          taskProfitMargin = 100;
        }

        // Prevent NaN or Infinity
        if (!isFinite(taskTotalPrice) || isNaN(taskTotalPrice)) {
          taskTotalPrice = 0;
        }

        return {
          ...task,
          totalCost: taskTotalCost,
          profitMargin: taskProfitMargin,
          totalPrice: taskTotalPrice,
        };
      });

      return {
        ...project,
        tasks: updatedTasks,
        totalCost: newTotalCost ?? 0,
        totalPrice: newTotalPrice ?? 0,
        profitMargin: newProfitMargin ?? 0,
      };
    }

    default: {
      return project;
    }
  }
}
