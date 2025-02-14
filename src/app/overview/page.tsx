"use client";

import { ArrowBigLeftDash } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

// Dynamically import the PDFDownloadButton to prevent SSR issues
const PDFDownloadButton = dynamic(() => import("@/components/pdf/PDFDownloadButton"), {
  ssr: false,
});

export default function Overview() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center">
      <h1 className="mb-12 text-center text-2xl font-bold">Overview</h1>

      {/* PDF Download Button */}
      <PDFDownloadButton />

      {/* Previous Page Button */}
      <Link className="mt-12 flex-shrink-0 rounded-full p-2 hover:bg-slate-200" href="/profit">
        <ArrowBigLeftDash size={30} />
      </Link>
    </div>
  );
}
