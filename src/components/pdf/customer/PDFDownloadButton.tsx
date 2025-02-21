"use client";

import { pdf } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import React, { useState } from "react";

import PDFDocument from "@/components/pdf/customer/PDFDocument";
import { useProject } from "@/hooks/useProject";

export default function PDFDownloadButton() {
  const [loading, setLoading] = useState(false);
  const project = useProject(); // Fetch project data

  const handleDownload = async () => {
    setLoading(true);
    try {
      // Ensure the function only runs on the client side
      if (typeof window === "undefined") return;

      // Generate the PDF Blob
      const blob = await pdf(<PDFDocument project={project} />).toBlob();

      // Create a URL and trigger download
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "Customer_Invoice.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setLoading(false);
  };

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-blue-500 bg-blue-500 px-3 py-2 text-base font-medium text-white transition-all duration-200 ease-in-out hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? (
        <p className="animate-pulse">Generating PDF...</p>
      ) : (
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          <p>Customer</p>
        </div>
      )}
    </button>
  );
}
