"use client";

import { ArrowBigRightDash } from "lucide-react";
import Link from "next/link";

import ProfitCalculator from "@/components/profit/ProfitCalculator";
import { useProject } from "@/hooks/useProject";
import { formatToDecimalCost } from "@/lib/format";
import { Project, Task } from "@/types";

interface TasksListProps {
  tasks: Task[];
}

interface SummaryProps {
  project: Project;
}

export default function Profit() {
  const project = useProject();

  return (
    <div className="container flex flex-1 flex-col items-center justify-center px-8 py-10">
      <div className="w-full">
        <TasksList tasks={project.tasks} />
        <Summary project={project} />
      </div>

      {/* Navigation */}
      <div className="mt-10 flex w-full justify-center gap-6">
        <Link className="btn-icon" href="/users">
          <ArrowBigRightDash size={22} />
        </Link>
      </div>
    </div>
  );
}

function TasksList({ tasks }: TasksListProps) {
  return (
    <div className="w-full space-y-6">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-xl border border-neutral-700 p-6 shadow-md">
          <h2 className="flex items-center gap-2 text-xl font-semibold">📂 {task.name}</h2>

          {/* Cost Breakdown */}
          <div className="mt-4 flex justify-between border-t border-neutral-700 pt-3 text-lg font-bold">
            <p>Total Cost:</p>
            <div className="flex items-center gap-2">
              <p className="text-blue-500">${formatToDecimalCost(task.totalCost, 2)}</p>
              {task.profitMargin !== 0 && (
                <p className="text-base text-red-500">
                  (${formatToDecimalCost(task.totalPrice, 2)})
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Summary({ project }: SummaryProps) {
  const totalCost = project.totalCost ?? 0;
  const profitMargin = project.profitMargin ?? 0;
  const totalPrice = project.totalPrice ?? 0;
  const totalProfit = project.totalProfit ?? 0;

  return (
    <div className="mt-8 w-full rounded-xl border border-neutral-700 bg-neutral-200 p-6 shadow-md dark:bg-neutral-800">
      <h2 className="text-xl font-semibold">Project Summary</h2>

      <hr className="my-4 dark:border-neutral-700" />

      {/* TOTAL COST */}
      <div className="flex items-center justify-between text-lg font-bold">
        <span>Total Cost:</span>
        <div className="flex items-center gap-2">
          <span className="0 text-blue-500">${formatToDecimalCost(totalCost, 2)}</span>
          {profitMargin !== 0 && (
            <span className="text-base text-red-500">(${formatToDecimalCost(totalPrice, 2)})</span>
          )}
        </div>
      </div>

      {/* TOTAL PROFIT */}
      <div className="mt-4 flex items-center justify-between text-lg font-bold">
        <span>Total Profit:</span>
        <div className="flex items-center gap-2">
          <ProfitCalculator totalProfit={totalProfit} />
          <span className="text-xl font-extrabold text-green-500">{profitMargin.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
