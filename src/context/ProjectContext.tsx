"use client";

import { createContext, ReactNode, useEffect, useReducer, useState } from "react";

import { calculateTotalCost } from "@/lib/calculation";
import { Project, ProjectAction } from "@/types";

interface ProjectProviderProps {
  initialProjectData: Project;
  children: ReactNode;
}

// Create Contexts
export const ProjectContext = createContext<Project[] | null>(null);
export const ProjectDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);

// Create Provider
export function ProjectProvider({ initialProjectData, children }: ProjectProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get initial project data
  const getInitialData = () => {
    if (typeof window !== "undefined") {
      const storedProject = sessionStorage.getItem("project");
      return storedProject ? JSON.parse(storedProject) : initialProjectData;
    }
    return initialProjectData;
  };

  const [project, dispatch] = useReducer(projectReducer, initialProjectData, getInitialData);

  useEffect(() => {
    if (isClient) {
      sessionStorage.setItem("project", JSON.stringify(project));
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
    case "updated_project_name": {
      console.log("updated_project_name");
      return { ...project, name: action.payload.projectName };
    }

    case "updated_total_profit": {
      const totalPrice = Number(project.totalCost) + Number(action.payload.totalProfit);
      const profitMargin = (1 - Number(project.totalCost) / totalPrice) * 100;

      return {
        ...project,
        profitMargin: profitMargin,
        totalPrice: totalPrice,
        totalProfit: action.payload.totalProfit,
      };
    }

    case "updated_tasks": {
      const newTotalCost = calculateTotalCost(action.payload.tasks);
      return { ...project, tasks: action.payload.tasks, totalCost: newTotalCost };
    }

    default: {
      return project;
    }
  }
}
