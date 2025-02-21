"use client";

// import { ArrowBigLeftDash, Coffee } from "lucide-react";
import { ArrowBigLeftDash } from "lucide-react";
// import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";

// import { useState } from "react";
// import BuyMeCoffeeModal from "@/components/overview/BuyMeCoffeeModal";
import { useProject } from "@/hooks/useProject";
import { formatToDecimalCost } from "@/lib/format";
import { Additional, Customer, Labor, Material, Project, Task, User } from "@/types";

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

interface InfoItemProps {
  label: string;
  value: string;
  icon: string;
}

interface TaskSectionProps {
  title: string;
  items: Material[] | Labor[] | Additional[];
  icon: string;
}

export default function Overview() {
  const project = useProject();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-100">Project Overview</h1>

        {/* User & Customer Info */}
        <div className="grid gap-6 sm:grid-cols-2">
          <UserInfo user={project.user} />
          <CustomerInfo customer={project.customer} />
        </div>

        {/* Tasks & Summary */}
        <TasksList tasks={project.tasks} />
        <Summary project={project} />

        {/* Navigation */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link className="btn-secondary" href="/users">
            <ArrowBigLeftDash size={22} /> Modify Users
          </Link>
          <ProviderPDFDownloadButton />
          <CustomerPDFDownloadButton />
        </div>

        {/* Donation Button */}
        {/* <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-yellow-600"
        onClick={() => setIsModalOpen(true)}
      >
        <Coffee className="h-6 w-6" />
        Buy Me a Coffee
      </motion.button> */}

        {/* Payment Modal */}
        {/* {isModalOpen && <BuyMeCoffeeModal onClose={() => setIsModalOpen(false)} />} */}
      </div>
    </div>
  );
}

function UserInfo({ user }: { user: User }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold text-gray-200">Provider Information</h2>
      <InfoItem label="Name" value={user.name} icon="📛" />
      <InfoItem label="Phone" value={user.phone} icon="📞" />
      <InfoItem label="Email" value={user.email} icon="📧" />
    </div>
  );
}

function CustomerInfo({ customer }: { customer: Customer }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold text-gray-200">Customer Information</h2>
      <InfoItem label="Name" value={customer.name} icon="📛" />
      <InfoItem label="Address" value={customer.address} icon="📍" />
      <InfoItem label="Phone" value={customer.phone} icon="📞" />
      <InfoItem label="Email" value={customer.email} icon="📧" />
    </div>
  );
}

function InfoItem({ label, value, icon }: InfoItemProps) {
  return (
    <p className="flex items-center gap-2 text-gray-300">
      {icon} <span className="font-medium">{label}:</span> {value}
    </p>
  );
}

function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="mt-8 space-y-6">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-100">📂 {task.name}</h2>

          {/* Task Sections */}
          <TaskSection title="Materials" items={task.materials} icon="📦" />
          <TaskSection title="Labors" items={task.labors} icon="🛠️" />
          <TaskSection title="Additional" items={task.additional} icon="📑" />

          {/* Task Cost */}
          <div className="mt-4 flex justify-between border-t border-gray-600 pt-3 text-lg font-medium text-gray-200">
            <p>Total Cost:</p>
            <div className="flex items-center gap-2">
              <p className="text-blue-400">${formatToDecimalCost(task.totalCost, 2)}</p>
              {task.profitMargin !== 0 && (
                <p className="text-red-500">(${formatToDecimalCost(task.totalPrice, 2)})</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TaskSection({ title, items, icon }: TaskSectionProps) {
  if (!items.length) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
      <ul className="mt-2 space-y-1 text-gray-300">
        {items.map((item) => {
          if (title === "Materials") {
            // Material
            const material = item as Material;

            return (
              <li key={material.id} className="flex justify-between">
                <p className="flex items-center gap-2">
                  {icon} {material.name}
                  <span className="text-sm text-gray-400">
                    (${material.unitCost}/{material.unit} x {material.quantity})
                  </span>
                </p>
                <p className="font-medium text-blue-400">
                  ${formatToDecimalCost(material.cost, 2)}
                </p>
              </li>
            );
          } else if (title === "Labors") {
            // Labor
            const labor = item as Labor;

            return (
              <li key={labor.id} className="flex justify-between">
                <p className="flex items-center gap-2">
                  {icon} {labor.role}
                  <span className="text-sm text-gray-400">
                    (${labor.unitCost}/{labor.unit} x {labor.quantity})
                  </span>
                </p>
                <p className="font-medium text-blue-400">${formatToDecimalCost(labor.cost, 2)}</p>
              </li>
            );
          } else {
            // Additional
            const additional = item as Additional;

            return (
              <li key={additional.id} className="flex justify-between">
                <p className="flex items-center gap-2">
                  {icon} {additional.type}
                </p>
                <p className="font-medium text-blue-400">
                  ${formatToDecimalCost(additional.cost, 2)}
                </p>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

function Summary({ project }: { project: Project }) {
  return (
    <div className="mt-8 rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-100">Project Summary</h2>
      <hr className="my-4 border-gray-600" />

      {/* TOTAL COST */}
      <div className="flex justify-between text-lg font-medium text-gray-300">
        <p>Total Cost:</p>
        <p className="text-blue-400">${formatToDecimalCost(project.totalCost, 2)}</p>
      </div>

      {/* TOTAL PRICE */}
      <div className="mt-4 flex justify-between text-lg font-medium text-gray-300">
        <p>Total Price:</p>
        <p className="text-blue-400">${formatToDecimalCost(project.totalPrice, 2)}</p>
      </div>

      {/* TOTAL PROFIT */}
      <div className="mt-4 flex justify-between text-lg font-medium">
        <p className="text-gray-300">Total Profit:</p>
        <p className={`${project.totalProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
          {`$${formatToDecimalCost(project.totalProfit, 2)} / ${formatToDecimalCost(
            project.profitMargin,
            1
          )}%`}
        </p>
      </div>
    </div>
  );
}
