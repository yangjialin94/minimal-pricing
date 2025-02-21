import { useContext } from "react";

import { ProjectDispatchContext } from "@/context/ProjectContext";

// Dispatch project
export function useProjectDispatch() {
  const context = useContext(ProjectDispatchContext);

  if (!context) {
    throw new Error("useProjectDispatch must be used within a ProjectProvider");
  }
  return context;
}
