"use client";

import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import Link from "next/link";

import ProfitCalculator from "@/components/profit/ProfitCalculator";
import { useProject } from "@/hooks/useProject";
import { formatToDecimalCost } from "@/lib/format";
import { Additional, Labor, Material } from "@/types";

interface TasksListProps {
  tasks: Task[];
}

interface TaskSectionProps {
  title: string;
  items: Material[] | Labor[] | Additional[];
  icon: string;
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

function TasksList({ tasks }: TasksListProps) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="mb-6 rounded-lg border bg-white p-4 shadow-md">
          {/* Project Name */}
          <h2 className="flex items-center gap-2 text-xl font-semibold">📂 {task.name}</h2>

          <hr className="my-4" />

          {/* Sections */}
          <TaskSection title="Materials" items={task.materials} icon="📦" />
          <TaskSection title="Labors" items={task.labors} icon="⚒️" />
          <TaskSection title="Additional" items={task.additional} icon="🏡" />

          {/* Total Cost */}
          <div className="mt-4 flex justify-between border-t pt-2 text-lg font-bold text-gray-900">
            <p>Total Cost:</p>
            <div className="flex items-center gap-2">
              <p>${formatToDecimalCost(task.totalCost, 2)}</p>
              {task.profitMargin !== 0 && (
                <p className="text-red-500">(${formatToDecimalCost(task.totalPrice, 2)})</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function TaskSection({ title, items, icon }: TaskSectionProps) {
  if (items.length > 0) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <ul className="mt-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-gray-700">
              <div className="flex items-center gap-2">
                <p className="flex items-center">
                  {icon} {item.name || item.role || item.type}
                </p>
                {["Materials", "Labors"].includes(title) && (
                  <p className="flex items-center">
                    (${item.unitCost}/{item.unit} x {item.quantity})
                  </p>
                )}
              </div>
              <p className="flex items-center gap-2 font-medium">
                ${formatToDecimalCost(item.cost, 2)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function Summary({ project }: SummaryProps) {
  const totalCost = project.totalCost;
  const profitMargin = project.profitMargin;
  const totalPrice = project.totalPrice;
  const totalProfit = project.totalProfit;

  return (
    <div className="mt-6 flex flex-col">
      {/* Overall Total */}
      <div className="flex justify-between border-gray-300 pt-4 text-xl font-bold text-gray-900">
        <p>Total Cost:</p>
        <div className="flex items-center gap-2">
          <p>${formatToDecimalCost(totalCost, 2)}</p>
          <p className="text-red-500">(${formatToDecimalCost(totalPrice, 2)})</p>
        </div>
      </div>

      {/* Profit Margin */}
      <div className="flex justify-between border-gray-300 pt-4 text-xl font-bold text-gray-900">
        <p>Profit:</p>

        <ProfitCalculator profitMargin={profitMargin} totalProfit={totalProfit} />
      </div>
    </div>
  );
}
