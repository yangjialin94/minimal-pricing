"use client";

import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { useProject } from "@/hooks/useProject";
import { useProjectDispatch } from "@/hooks/useProjectDispatch";
import { Customer, User } from "@/types";

interface InputFieldRowProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Users() {
  const project = useProject();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-6">
      <h1 className="mb-6 text-center text-2xl font-bold">Users</h1>

      {/* User Information */}
      <UserInfo user={project.user} />

      {/* Customer Information */}
      <CustomerInfo customer={project.customer} />

      {/* Navigation */}
      <div className="mt-10 flex w-full justify-center gap-6">
        <Link
          className="flex items-center gap-2 rounded-md border px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100"
          href="/profit"
        >
          <ArrowBigLeftDash size={22} /> Calculate Profit
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md border px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100"
          href="/overview"
        >
          Project Overview <ArrowBigRightDash size={22} />
        </Link>
      </div>
    </div>
  );
}

function UserInfo({ user }: { user: User }) {
  const dispatch = useProjectDispatch();
  const [userState, setUserState] = useState(user);

  const debouncedUser = {
    name: useDebounce(userState.name, 500),
    phone: useDebounce(userState.phone, 500),
    email: useDebounce(userState.email, 500),
  };

  useEffect(() => {
    dispatch({
      type: "updated_user",
      payload: {
        userName: debouncedUser.name,
        userPhone: debouncedUser.phone,
        userEmail: debouncedUser.email,
      },
    });
  }, [debouncedUser.name, debouncedUser.phone, debouncedUser.email, dispatch]);

  return (
    <div className="w-full rounded-md border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Provider Information</h2>
      <div className="space-y-4">
        {["name", "phone", "email"].map((field) => (
          <InputFieldRow
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={userState[field]}
            onChange={(e) => setUserState((prev) => ({ ...prev, [field]: e.target.value }))}
          />
        ))}
      </div>
    </div>
  );
}

function CustomerInfo({ customer }: { customer: Customer }) {
  const dispatch = useProjectDispatch();
  const [customerState, setCustomerState] = useState(customer);

  const debouncedCustomer = {
    name: useDebounce(customerState.name, 500),
    address: useDebounce(customerState.address, 500),
    phone: useDebounce(customerState.phone, 500),
    email: useDebounce(customerState.email, 500),
  };

  // Update customer in the global state when debounce completes
  useEffect(() => {
    dispatch({
      type: "updated_customer",
      payload: {
        customerName: debouncedCustomer.name,
        customerAddress: debouncedCustomer.address,
        customerPhone: debouncedCustomer.phone,
        customerEmail: debouncedCustomer.email,
      },
    });
  }, [
    debouncedCustomer.name,
    debouncedCustomer.address,
    debouncedCustomer.phone,
    debouncedCustomer.email,
    dispatch,
  ]);

  return (
    <div className="mt-6 w-full rounded-md border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Customer Information</h2>
      <div className="space-y-4">
        {["name", "address", "phone", "email"].map((field) => (
          <InputFieldRow
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={customerState[field]}
            onChange={(e) => setCustomerState((prev) => ({ ...prev, [field]: e.target.value }))}
          />
        ))}
      </div>
    </div>
  );
}

function InputFieldRow({ label, value, onChange }: InputFieldRowProps) {
  return (
    <div className="flex items-center gap-4">
      <label className="w-24 text-lg font-bold text-gray-900">{label}:</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}
