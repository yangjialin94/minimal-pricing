import { useContext } from "react";

import { TasksContext } from "@/context/TasksContext";

// Read tasks
export function useTasks() {
  return useContext(TasksContext);
}
