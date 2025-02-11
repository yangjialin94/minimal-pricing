"use client";

import { useState } from "react";
import TaskManager from "@/components/TaskManager";
import { useTasks, useTasksDispatch } from "@/context/TasksContext";
import Material from "@/components/Material";
import Labor from "@/components/Labor";

function AddTask() {
  const [taskName, setTaskName] = useState<string>("");
  const dispatch = useTasksDispatch();

  const handleAddTask = () => {
    dispatch({
      type: "added_task",
      payload: {
        name: taskName,
      },
    });
  };

  return (
    <div className="flex items-center gap-4">
      <input
        className="border-2 text-xl border-slate-300 px-4 py-2 rounded-full"
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button
        className="border px-4 py-2 text-xl rounded-full bg-blue-500 text-white hover:bg-blue-400"
        onClick={handleAddTask}
      >
        Add a Task
      </button>
    </div>
  );
}

function Task() {
  return (
    <div key={task.id} className="border p-4 mb-4 rounded-lg">
      <input
        type="text"
        placeholder="Task Name"
        className="border p-2 w-full mb-2"
        value={task.name}
        onChange={(e) => updateTaskName(task.id, e.target.value)}
      />

      <h3 className="font-bold">Materials</h3>
      <button
        onClick={() => addMaterial(task.id)}
        className="bg-green-500 text-white px-2 py-1 mb-2"
      >
        + Add Material
      </button>
      {task.materials.map((material) => (
        <Material
          key={material.id}
          taskId={material.id}
          materialId={material.id}
          onChange={handleOnChangeMaterial}
        />
      ))}
      <h3 className="font-bold">Labors</h3>
      <button onClick={() => addLabor(task.id)} className="bg-red-500 text-white px-2 py-1 mb-2">
        + Add Labor
      </button>
      {task.labors.map((labor) => (
        <Labor taskId={material.id} laborId={material.id} onChange={handleOnChangeLabor} />
      ))}
    </div>
  );
}

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
      <h1 className="text-2xl font-bold text-center mb-12">Pricing Calculator</h1>
      <TaskList />
      <AddTask />
    </div>
  );
}
