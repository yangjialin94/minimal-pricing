"use client";

// import Material from "@/components/Material";
// import Labor from "@/components/Labor";
import clsx from "clsx";
import { useState } from "react";

import { useTasks, useTasksDispatch } from "@/context/TasksContext";

function AddTask() {
  const [taskName, setTaskName] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const dispatch = useTasksDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasError) {
      setHasError(false);
    }
    setTaskName(e.target.value);
  };

  const handleAddTask = () => {
    if (!taskName.trim()) {
      setTaskName("");
      setHasError(true);
      return;
    }

    setTaskName("");
    dispatch({
      type: "added_task",
      payload: {
        name: taskName.trim(),
      },
    });
  };

  return (
    <div className="flex items-center gap-4">
      <input
        className={clsx(
          "rounded-full border-2 border-slate-300 px-4 py-2 text-xl focus:placeholder-transparent",
          {
            "border-red-500 placeholder-red-500": hasError,
          }
        )}
        placeholder="Task name"
        value={taskName}
        onChange={handleNameChange}
      />
      <button
        className="rounded-full border bg-blue-500 px-4 py-2 text-xl text-white hover:bg-blue-400"
        onClick={handleAddTask}
      >
        Add a Task
      </button>
    </div>
  );
}

// function Task() {
//   const handleOnChangeLabor = (
//     taskId: number,
//     laborId: number,
//     field: string,
//     value: string | number
//   ) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               labors: task.labors.map((lab) =>
//                 lab.id === laborId ? { ...lab, [field]: value } : lab
//               ),
//             }
//           : task
//       )
//     );
//   };

//   const addLabor = (taskId: number) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               labors: [
//                 ...task.labors,
//                 { id: Date.now(), peopleCount: 1, daysCount: 1, pricePerDay: 0 },
//               ],
//             }
//           : task
//       )
//     );
//   };

//   return (
//     <div key={task.id} className="border p-4 mb-4 rounded-lg">
//       <input
//         type="text"
//         placeholder="Task Name"
//         className="border p-2 w-full mb-2"
//         value={task.name}
//         onChange={(e) => updateTaskName(task.id, e.target.value)}
//       />

//       <h3 className="font-bold">Materials</h3>
//       <button
//         onClick={() => addMaterial(task.id)}
//         className="bg-green-500 text-white px-2 py-1 mb-2"
//       >
//         + Add Material
//       </button>
//       {task.materials.map((material) => (
//         <Material
//           key={material.id}
//           taskId={material.id}
//           materialId={material.id}
//           onChange={handleOnChangeMaterial}
//         />
//       ))}
//       <h3 className="font-bold">Labors</h3>
//       <button onClick={() => addLabor(task.id)} className="bg-red-500 text-white px-2 py-1 mb-2">
//         + Add Labor
//       </button>
//       {task.labors.map((labor) => (
//         <Labor taskId={material.id} laborId={material.id} onChange={handleOnChangeLabor} />
//       ))}
//     </div>
//   );
// }

function TaskList() {
  const tasks = useTasks();

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <p>{task.name}</p>
          {/* <Task /> */}
        </li>
      ))}
    </ul>
  );
}

export default function Project() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-12 text-center text-2xl font-bold">Pricing Calculator</h1>
      <TaskList />
      <AddTask />
    </div>
  );
}
