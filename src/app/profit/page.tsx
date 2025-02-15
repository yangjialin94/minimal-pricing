"use client";

import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useProject, useProjectDispatch } from "@/context/ProjectContext";
import { formatToDecimalCost } from "@/lib/format";
import { INITIAL_PROJECT } from "@/tests/test";
import { Additional, Labor, Material, Task } from "@/types";

interface TaskSummaryProps {
  task: Task;
  costPercentage: number;
}

interface TaskSectionProps {
  title: string;
  items: Material[] | Labor[] | Additional[];
  icon: string;
  costPercentage?: number;
}

interface OverallTotalProps {
  projectTotalCost: number;
  projectTotalAsked: number;
}

interface ProfitMarginProps {
  profitPercentage: number;
  projectTotalProfit: number;
}

export default function Profit() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center">
      <h1 className="mb-12 text-center text-2xl font-bold">Profit Calculator</h1>
      <TasksList />

      {/* Prev Page Button */}
      <div className="mt-12 flex gap-4">
        <Link className="flex-shrink-0 rounded-full p-2 hover:bg-slate-200" href="/tasks">
          <ArrowBigLeftDash size={30} />
        </Link>
        <Link className="flex-shrink-0 rounded-full p-2 hover:bg-slate-200" href="/overview">
          <ArrowBigRightDash size={30} />
        </Link>
      </div>
    </div>
  );
}

function TasksList() {
  const [project, setProject] = useState<Task[]>(INITIAL_PROJECT);
  const loadedProject = useProject();

  // Load project
  useEffect(() => {
    if (loadedProject) {
      setProject(loadedProject);
    }
  }, [loadedProject]);

  const tasks = project.tasks;

  // Calculations
  const projectTotalCost = tasks.reduce(
    (total, task) =>
      total +
      task.materials.reduce((sum, item) => sum + item.cost, 0) +
      task.labors.reduce((sum, item) => sum + item.cost, 0) +
      task.additional.reduce((sum, item) => sum + item.cost, 0),
    0
  );
  const costPercentage = 1 - project.profitMargin;
  const projectTotalAsked = projectTotalCost / costPercentage;
  const projectTotalProfit = projectTotalAsked - projectTotalCost;

  return (
    <div className="w-full px-8">
      {/* Tasks*/}
      {tasks.map((task) => (
        <TaskSummary key={task.id} task={task} costPercentage={costPercentage} />
      ))}

      {/* Profit Calculation */}
      <div className="mt-6 flex flex-col">
        {/* Overall Total */}
        <OverallTotal projectTotalCost={projectTotalCost} projectTotalAsked={projectTotalAsked} />

        {/* Profit Margin */}
        <ProfitMargin
          profitPercentage={project.profitPercentage}
          projectTotalProfit={formatToDecimalCost(projectTotalProfit, 2)}
        />
      </div>
    </div>
  );
}

function TaskSummary({ task, costPercentage }: TaskSummaryProps) {
  // Calculate Task Total Cost
  const totalTaskCost =
    task.materials.reduce((sum, item) => sum + item.cost, 0) +
    task.labors.reduce((sum, item) => sum + item.cost, 0) +
    task.additional.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div key={task.id} className="mb-6 rounded-lg border bg-white p-4 shadow-md">
      {/* Project Name */}
      <h2 className="flex items-center gap-2 text-xl font-semibold">📂 {task.name}</h2>

      <hr className="my-4" />

      {/* Sections */}
      <TaskSection title="Materials" items={task.materials} icon="📦" />
      <TaskSection title="Labors" items={task.labors} icon="⚒️" costPercentage={costPercentage} />
      <TaskSection title="Additional" items={task.additional} icon="🏡" />

      {/* Total Cost */}
      <div className="mt-4 flex justify-between border-t pt-2 text-lg font-bold text-gray-900">
        <p>Total Cost:</p>
        <div className="flex items-center gap-2">
          <p>${formatToDecimalCost(totalTaskCost, 2)}</p>
          <p className="text-red-500">
            (${formatToDecimalCost(totalTaskCost / costPercentage, 2)})
          </p>
        </div>
      </div>
    </div>
  );
}

function TaskSection({ title, items, icon, costPercentage = 1 }: TaskSectionProps) {
  if (items.length > 0) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <ul className="mt-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between text-gray-700">
              <p className="flex items-center gap-2">
                {icon} {item.name}
              </p>
              <div className="flex items-center gap-2 font-medium">
                <p>${formatToDecimalCost(item.cost, 2)}</p>
                {costPercentage !== 1 && (
                  <p className="text-red-500">
                    (${formatToDecimalCost(item.cost / costPercentage, 2)})
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function OverallTotal({ projectTotalCost, projectTotalAsked }: OverallTotalProps) {
  return (
    <div className="flex justify-between border-gray-300 pt-4 text-xl font-bold text-gray-900">
      <p>Total Cost:</p>
      <div className="flex items-center gap-2">
        <p>${formatToDecimalCost(projectTotalCost, 2)}</p>
        <p className="text-red-500">(${formatToDecimalCost(projectTotalAsked, 2)})</p>
      </div>
    </div>
  );
}

function ProfitMargin({ profitPercentage, projectTotalProfit }: ProfitMarginProps) {
  const dispatch = useProjectDispatch();

  // Update profit percentage
  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "updated_profit", payload: { profitPercentage: e.target.value } });
  };

  return (
    <div className="flex justify-between border-gray-300 pt-4 text-xl font-bold text-gray-900">
      <p>Profit Margin:</p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <input
            className="w-20 rounded-full border-2 border-slate-300 px-4 text-lg focus:placeholder-transparent"
            type="number"
            min="0"
            max="99"
            value={profitPercentage}
            onChange={handleMarginChange}
          />
          <p>%</p>
        </div>
        <p className="text-red-500">(${projectTotalProfit.toLocaleString()})</p>
      </div>
    </div>
  );
}
