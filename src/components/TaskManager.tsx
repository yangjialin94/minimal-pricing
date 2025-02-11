"use client";

import { useState } from "react";
import Material from "./Material";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), name: "", materials: [], labors: [] }]);
  };

  const updateTaskName = (id: number, name: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, name } : task)));
  };

  const addMaterial = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              materials: [
                ...task.materials,
                { id: Date.now(), name: "", unitCount: 1, pricePerUnit: 0 },
              ],
            }
          : task
      )
    );
  };

  const handleOnChangeMaterial = (
    taskId: number,
    materialId: number,
    field: string,
    value: string | number
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              materials: task.materials.map((mat) =>
                mat.id === materialId ? { ...mat, [field]: value } : mat
              ),
            }
          : task
      )
    );
  };

  const addLabor = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              labors: [
                ...task.labors,
                { id: Date.now(), peopleCount: 1, daysCount: 1, pricePerDay: 0 },
              ],
            }
          : task
      )
    );
  };

  const handleOnChangeLabor = (
    taskId: number,
    laborId: number,
    field: string,
    value: string | number
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              labors: task.labors.map((lab) =>
                lab.id === laborId ? { ...lab, [field]: value } : lab
              ),
            }
          : task
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Dynamic Task Manager</h1> */}
      <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 mb-4">
        Add Task
      </button>

      {tasks.map((task) => (
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
          <button
            onClick={() => addLabor(task.id)}
            className="bg-red-500 text-white px-2 py-1 mb-2"
          >
            + Add Labor
          </button>
          {task.labors.map((labor) => (
            <Labor taskId={material.id} materialId={material.id} onChange={handleOnChangeLabor} />
            // <div key={labor.id} className="border p-2 mb-2">
            //   <input
            //     type="number"
            //     placeholder="People"
            //     className="border p-2 w-1/4"
            //     value={labor.peopleCount}
            //     onChange={(e) => handleOnChangeLabor(task.id, labor.id, "peopleCount", +e.target.value)}
            //   />
            //   <input
            //     type="number"
            //     placeholder="Days"
            //     className="border p-2 w-1/4"
            //     value={labor.daysCount}
            //     onChange={(e) => handleOnChangeLabor(task.id, labor.id, "daysCount", +e.target.value)}
            //   />
            //   <input
            //     type="number"
            //     placeholder="Price/Day"
            //     className="border p-2 w-1/4"
            //     value={labor.pricePerDay}
            //     onChange={(e) => handleOnChangeLabor(task.id, labor.id, "pricePerDay", +e.target.value)}
            //   />
            // </div>
          ))}
        </div>
      ))}
    </div>
  );
}
