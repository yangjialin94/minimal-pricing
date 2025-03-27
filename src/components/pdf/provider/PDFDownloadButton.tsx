"use client";

import { pdf } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import React, { useState } from "react";

import PDFDocument from "@/components/pdf/provider/PDFDocument";
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
      a.download = "Project_Quote.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setLoading(false);
  };

  return (
    <button className="btn-primary" onClick={handleDownload} disabled={loading}>
      {loading ? (
        <p className="animate-pulse">Generating PDF...</p>
      ) : (
        <div className="flex items-center gap-2">
          <Download className="size-5 animate-bounce" />
          <p>User</p>
        </div>
      )}
    </button>
  );
}
