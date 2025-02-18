"use client";

import { ArrowBigLeftDash } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useProject } from "@/hooks/useProject";
import { formatToDecimalCost } from "@/lib/format";
import { Additional, Customer, Labor, Material, User } from "@/types";

const ProviderPDFDownloadButton = dynamic(
  () => import("@/components/pdf/provider/PDFDownloadButton"),
  {
    ssr: false,
  }
);

const CustomerPDFDownloadButton = dynamic(
  () => import("@/components/pdf/customer/PDFDownloadButton"),
  {
    ssr: false,
  }
);

interface UserProps {
  user: User;
}

interface CustomerProps {
  customer: Customer;
}

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
      <h1 className="mb-12 text-center text-2xl font-bold">Project Overview</h1>

      <div className="w-full px-8">
        <User user={project.user} />
        <Customer customer={project.customer} />
        <TasksList tasks={project.tasks} />
        <Summary project={project} />
      </div>

      {/* Navigation */}
      <div className="mt-10 flex gap-6">
        <Link
          className="flex items-center gap-2 rounded-md border px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100"
          href="/users"
        >
          <ArrowBigLeftDash size={22} /> Modify Users
        </Link>

        {/* Provider PDF Download Button */}
        <ProviderPDFDownloadButton />

        {/* Customer PDF Download Button */}
        <CustomerPDFDownloadButton />
      </div>
    </div>
  );
}

function User({ user }: UserProps) {
  return (
    <div className="mb-6 rounded-md border bg-white p-5 shadow-md">
      <h2 className="flex items-center gap-2 text-xl font-semibold">👤 User Information</h2>
      <hr className="my-4" />
      <div className="space-y-2 text-gray-700">
        <p className="flex items-center gap-2">
          📛 <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="flex items-center gap-2">
          📞 <span className="font-semibold">Phone:</span> {user.phone}
        </p>
        <p className="flex items-center gap-2">
          📧 <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
}

function Customer({ customer }: CustomerProps) {
  return (
    <div className="mb-6 rounded-md border bg-white p-5 shadow-md">
      <h2 className="flex items-center gap-2 text-xl font-semibold">👤 Customer Information</h2>
      <hr className="my-4" />
      <div className="space-y-2 text-gray-700">
        <p className="flex items-center gap-2">
          📛 <span className="font-semibold">Name:</span> {customer.name}
        </p>
        <p className="flex items-center gap-2">
          📍 <span className="font-semibold">Address:</span> {customer.address}
        </p>
        <p className="flex items-center gap-2">
          📞 <span className="font-semibold">Phone:</span> {customer.phone}
        </p>
        <p className="flex items-center gap-2">
          📧 <span className="font-semibold">Email:</span> {customer.email}
        </p>
      </div>
    </div>
  );
}

function TasksList({ tasks }: TasksListProps) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="mb-6 rounded-md border bg-white p-5 shadow-md">
          <h2 className="flex items-center gap-2 text-xl font-semibold">📂 {task.name}</h2>
          <hr className="my-4" />

          <TaskSection title="Materials" items={task.materials} icon="📦" />
          <TaskSection title="Labors" items={task.labors} icon="🛠️" />
          <TaskSection title="Additional" items={task.additional} icon="📑" />

          <div className="mt-4 flex justify-between border-t pt-3 text-lg font-bold text-gray-900">
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
    <div className="mt-6 flex flex-col rounded-xl bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Project Summary</h2>
      <hr className="my-4 border-gray-300" />

      {/* Total Cost */}
      <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
        <p>Total Cost:</p>
        <p className="text-gray-900">${formatToDecimalCost(totalCost, 2)}</p>
      </div>

      {/* Total Price */}
      <div className="mt-4 flex items-center justify-between text-lg font-semibold text-gray-700">
        <p>Total Price:</p>
        <p>${formatToDecimalCost(totalPrice, 2)}</p>
      </div>

      {/* Total Profit */}
      <div className="mt-4 flex items-center justify-between text-lg font-semibold text-gray-700">
        <p>Total Profit:</p>
        <p className={`${totalProfit >= 0 ? "text-green-600" : "text-red-500"}`}>
          {`$${formatToDecimalCost(totalProfit, 2)} / ${formatToDecimalCost(profitMargin, 1)}%`}
        </p>
      </div>
    </div>
  );
}
