import "../styles/globals.css";

import type { Metadata } from "next";

import { ProjectProvider } from "@/context/ProjectContext";
import { TasksProvider } from "@/context/TasksContext";
import { PROJECT_FALLBACK } from "@/data/project-fallback";

export const metadata: Metadata = {
  title: "Contract Pricing",
  description: "Contract pricing calculator app",
};

// Fetch data from the server (runs only on first load)
async function getProjectDataFromServer() {
  try {
    // Build an absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/project-template`, {});
    if (!response.ok) throw new Error("Failed to fetch project data");
    return await response.json();
  } catch (error) {
    console.error(error);
    return PROJECT_FALLBACK;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialProjectData = await getProjectDataFromServer();

  return (
    <html lang="en">
      <body className="flex min-h-screen w-screen items-center justify-center bg-gray-50">
        <ProjectProvider initialProjectData={initialProjectData}>
          <TasksProvider>
            <div className="w-full max-w-5xl p-6 md:p-10 lg:p-12 xl:p-16">{children}</div>
          </TasksProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
