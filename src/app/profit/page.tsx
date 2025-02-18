"use client";

import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import Link from "next/link";

import ProfitCalculator from "@/components/profit/ProfitCalculator";
import { useProject } from "@/hooks/useProject";
import { formatToDecimalCost } from "@/lib/format";

interface TasksListProps {
  tasks: Task[];
}

interface SummaryProps {
  project: Project;
}

export default function Profit() {
  const project = useProject();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center">
      <h1 className="mb-12 text-center text-2xl font-bold">Profit Calculator</h1>

      <div className="w-full px-8">
        <TasksList tasks={project.tasks} />
        <Summary project={project} />
      </div>

      {/* Navigation */}
      <div className="mt-10 flex w-full justify-center gap-8">
        <Link
          className="flex items-center gap-2 rounded-md border px-5 py-2 text-gray-700 shadow-sm hover:bg-gray-100"
          href="/tasks"
        >
          <ArrowBigLeftDash size={22} /> Modify Tasks
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md border px-5 py-2 text-gray-700 shadow-sm hover:bg-gray-100"
          href="/users"
        >
          Modify Users <ArrowBigRightDash size={22} />
        </Link>
      </div>
    </div>
  );
}

function TasksList({ tasks }: TasksListProps) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="mb-6 rounded-md border bg-white p-6 shadow-md">
          <h2 className="flex items-center gap-2 text-xl font-semibold">📂 {task.name}</h2>

          {/* Remove unnecessary horizontal rule */}

          <div className="mt-4 flex justify-between pt-3 text-lg font-bold text-gray-900">
            <p>Total Cost:</p>
            <div className="flex items-center gap-2">
              <p>${formatToDecimalCost(task.totalCost, 2)}</p>
              {task.profitMargin !== 0 && (
                <p className="text-base text-red-500">
                  (${formatToDecimalCost(task.totalPrice, 2)})
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function Summary({ project }: SummaryProps) {
  const totalCost = project.totalCost;
  const profitMargin = project.profitMargin;
  const totalPrice = project.totalPrice;
  const totalProfit = project.totalProfit;

  return (
    <div className="mt-6 flex flex-col rounded-md bg-gray-50 p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Project Summary</h2>

      <hr className="my-4" />

      {/* TOTAL COST */}
      <div className="flex items-center justify-between text-lg font-bold text-gray-900">
        <span>Total Cost:</span>
        <div className="flex items-center gap-2">
          <span>${formatToDecimalCost(totalCost, 2)}</span>
          <span className="text-base text-red-500">(${formatToDecimalCost(totalPrice, 2)})</span>
        </div>
      </div>

      {/* TOTAL PROFIT */}
      <div className="mt-4 flex items-center justify-between text-lg font-bold text-gray-900">
        <span>Total Profit:</span>
        <div className="flex items-center gap-2">
          <ProfitCalculator profitMargin={profitMargin} totalProfit={totalProfit} />
          <span className="text-xl font-extrabold text-green-600">{profitMargin.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
