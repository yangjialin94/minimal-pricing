"use client";

import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";

import { INITIAL_PROJECT } from "@/tests/test";
import { Project, ProjectAction } from "@/types";

// Create Contexts
export const ProjectContext = createContext<Project[] | null>(null);
export const ProjectDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);

// Create Provider
export function ProjectProvider({ children }: { children: ReactNode }) {
  // Load from sessionStorage
  const getSessionData = () => {
    if (typeof window !== "undefined") {
      const storedTasks = sessionStorage.getItem("project");
      return storedTasks ? JSON.parse(storedTasks) : INITIAL_PROJECT;
    }
    return INITIAL_PROJECT;
  };

  const [project, dispatch] = useReducer(projectReducer, INITIAL_PROJECT, getSessionData);

  useEffect(() => {
    sessionStorage.setItem("project", JSON.stringify(project));
  }, [project]);

  return (
    <ProjectContext.Provider value={project}>
      <ProjectDispatchContext.Provider value={dispatch}>{children}</ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}

// Custom Hook - Read project
export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}

// Custom Hook - Dispatch project
export function useProjectDispatch() {
  const context = useContext(ProjectDispatchContext);
  if (!context) {
    throw new Error("useProjectDispatch must be used within a ProjectProvider");
  }
  return context;
}

// Reducer function
function projectReducer(project: Project, action: ProjectAction) {
  switch (action.type) {
    case "updated_project_name":
      console.log("updated_project_name");
      return { ...project, name: action.payload.projectName };

    case "updated_profit":
      return { ...project, profitPercentage: action.payload.profitPercentage };

    case "updated_tasks":
      return { ...project, tasks: action.payload.tasks };

    default:
      return project;
  }
}
