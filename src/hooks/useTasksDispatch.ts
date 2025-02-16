import { useContext } from "react";

import { TasksDispatchContext } from "@/context/TasksContext";

// Dispatch tasks
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
