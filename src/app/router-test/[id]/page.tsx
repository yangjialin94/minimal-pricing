"use client";

import { useParams } from "next/navigation";

export default function Project() {
  const { id } = useParams();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
      <h1 className="mb-12 text-center text-2xl font-bold">Sub-Project {id}</h1>
    </div>
  );
}
