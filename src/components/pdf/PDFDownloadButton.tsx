"use client";

import { pdf } from "@react-pdf/renderer";
import React, { useState } from "react";

import PDFDocument from "@/components/pdf/PDFDocument";
import { useProject } from "@/context/ProjectContext";

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
      a.download = "Project_Report.pdf";
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
      className="flex items-center gap-2 rounded-full border-2 border-blue-500 bg-blue-500 px-4 py-2 text-xl text-white hover:bg-blue-400"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? "Generating PDF..." : "Download PDF"}
    </button>
  );
}
