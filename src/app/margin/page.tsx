"use client";

import { ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useTasks } from "@/context/TasksContext";
import { Additional, Labor, Material } from "@/types";

interface SectionProps {
  title: string;
  items: Material[] | Labor[] | Additional[];
  icon: string;
}

function TaskSection({ title, items, icon }: SectionProps) {
  if (items.length > 0) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <ul className="mt-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between text-gray-700">
              <span className="flex items-center gap-2">
                {icon} {item.name}
              </span>
              <span className="font-medium">${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function Overview() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const loadedTasks = useTasks();

  // Load tasks
  useEffect(() => {
    if (loadedTasks) {
      setTasks(loadedTasks);
    }
  }, [loadedTasks]);

  // Calculate Overall Total Price
  const projectTotalPrice = tasks.reduce(
    (total, task) =>
      total +
      task.materials.reduce((sum, item) => sum + item.price, 0) +
      task.labors.reduce((sum, item) => sum + item.price, 0) +
      task.additional.reduce((sum, item) => sum + item.price, 0),
    0
  );

  return (
    <div className="w-full px-8">
      {/* Tasks*/}
      {tasks.map((task) => {
        // Calculate Task Total Price
        const totalTaskPrice =
          task.materials.reduce((sum, item) => sum + item.price, 0) +
          task.labors.reduce((sum, item) => sum + item.price, 0) +
          task.additional.reduce((sum, item) => sum + item.price, 0);

        return (
          <div key={task.id} className="mb-6 rounded-lg border bg-white p-4 shadow-md">
            {/* Project Name */}
            <h2 className="flex items-center gap-2 text-xl font-semibold">📂 {task.name}</h2>

            <hr className="my-4" />

            {/* Sections */}
            <TaskSection title="Materials" items={task.materials} icon="📦" />
            <TaskSection title="Labors" items={task.labors} icon="⚒️" />
            <TaskSection title="Additional" items={task.additional} icon="🏡" />

            {/* Total Price */}
            <div className="mt-4 flex justify-between border-t pt-2 text-lg font-bold text-gray-900">
              <span>Total Price:</span>
              <span>${totalTaskPrice.toLocaleString()}</span>
            </div>
          </div>
        );
      })}

      {/* Overall Total */}
      {tasks.length > 0 && (
        <div className="mt-6 flex justify-between border-gray-300 pt-4 text-xl font-bold text-gray-900">
          <span>Overall Total Price:</span>
          <span>${projectTotalPrice.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}

export default function Margin() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center">
      <h1 className="mb-12 text-center text-2xl font-bold">Margin Calculator</h1>
      <Overview />

      {/* Prev Page Button */}
      <Link className="mt-12 flex-shrink-0 rounded-full p-2 hover:bg-slate-200" href="/tasks">
        <ArrowBigLeftDash size={30} />
      </Link>
    </div>
  );
}
