"use client";

import { ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";

export default function Overview() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center">
      <h1 className="mb-12 text-center text-2xl font-bold">Overview</h1>

      {/* Prev Page Button */}
      <Link className="mt-12 flex-shrink-0 rounded-full p-2 hover:bg-slate-200" href="/profit">
        <ArrowBigLeftDash size={30} />
      </Link>
    </div>
  );
}
