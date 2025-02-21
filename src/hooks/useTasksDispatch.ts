import { useContext } from "react";

import { TasksDispatchContext } from "@/context/TasksContext";

// Dispatch tasks
export function useTasksDispatch() {
  const dispatch = useContext(TasksDispatchContext);

  if (!dispatch) {
    throw new Error("useTasksDispatch must be used within a <TasksProvider>.");
  }

  return dispatch;
}
