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
    <div className="container flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 md:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
        Users
      </h1>

      <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
        <UserInfo user={project.user} />
        <CustomerInfo customer={project.customer} />
      </div>

      {/* Navigation */}
      <div className="mt-10 flex w-full max-w-lg justify-center gap-6">
        <Link className="btn-secondary" href="/profit">
          <ArrowBigLeftDash size={22} /> Calculate Profit
        </Link>
        <Link className="btn-primary" href="/overview">
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
    <div className="w-full rounded-lg border border-gray-300 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-600 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-200">
        Provider Information
      </h2>

      <div className="space-y-4">
        <InputFieldRow
          label="Name"
          value={userState.name}
          onChange={(e) => setUserState((prev) => ({ ...prev, name: e.target.value }))}
        />
        <InputFieldRow
          label="Phone"
          value={userState.phone}
          onChange={(e) => setUserState((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <InputFieldRow
          label="Email"
          value={userState.email}
          onChange={(e) => setUserState((prev) => ({ ...prev, email: e.target.value }))}
        />
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
    <div className="mt-6 w-full rounded-lg border border-gray-300 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-600 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-200">
        Customer Information
      </h2>

      <div className="space-y-4">
        <InputFieldRow
          label="Name"
          value={customerState.name}
          onChange={(e) => setCustomerState((prev) => ({ ...prev, name: e.target.value }))}
        />
        <InputFieldRow
          label="Address"
          value={customerState.address}
          onChange={(e) => setCustomerState((prev) => ({ ...prev, address: e.target.value }))}
        />
        <InputFieldRow
          label="Phone"
          value={customerState.phone}
          onChange={(e) => setCustomerState((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <InputFieldRow
          label="Email"
          value={customerState.email}
          onChange={(e) => setCustomerState((prev) => ({ ...prev, email: e.target.value }))}
        />
      </div>
    </div>
  );
}

function InputFieldRow({ label, value, onChange }: InputFieldRowProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <label className="w-full text-lg font-medium text-gray-900 dark:text-gray-200 sm:w-24 md:w-28">
        {label}:
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}...`}
        className="input-field max-w-md sm:flex-1"
      />
    </div>
  );
}
