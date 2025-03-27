"use client";

import { ArrowBigRightDash } from "lucide-react";
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
    <div className="container flex flex-1 flex-col items-center justify-center px-8 py-10">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
        <UserInfo user={project.user} />
        <CustomerInfo customer={project.customer} />
      </div>

      {/* Navigation */}
      <div className="mt-10 flex w-full max-w-lg justify-center gap-6">
        <Link className="btn-icon" href="/overview">
          <ArrowBigRightDash size={22} />
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
    <div className="w-full rounded-xl border border-neutral-300 bg-neutral-200 p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800">
      <h2 className="mb-4 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
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
    <div className="mt-6 w-full rounded-xl border border-neutral-300 bg-neutral-200 p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800">
      <h2 className="mb-4 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
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
      <label className="w-full text-lg font-medium text-neutral-800 dark:text-neutral-200 sm:w-24 md:w-28">
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
