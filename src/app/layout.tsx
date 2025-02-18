import "../styles/globals.css";

import type { Metadata } from "next";
import { Suspense } from "react";

import { ProjectProvider } from "@/context/ProjectContext";
import { TasksProvider } from "@/context/TasksContext";
import { PROJECT_FALLBACK } from "@/data/project-fallback";

export const metadata: Metadata = {
  title: "Contract Pricing",
  description: "Contract pricing calculator app",
};

// Fetch project data on the client side if possible (to avoid blocking UI rendering)
async function getProjectDataFromServer() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/project-template`);
    if (!response.ok) throw new Error("Failed to fetch project data");
    return await response.json();
  } catch (error) {
    console.error(error);
    return PROJECT_FALLBACK;
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialProjectData = await getProjectDataFromServer();

  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
        <ProjectProvider initialProjectData={initialProjectData}>
          <TasksProvider>
            <main className="flex w-full flex-col items-center justify-center">
              <div className="w-full max-w-3xl px-2 sm:max-w-4xl sm:px-6 md:max-w-5xl md:px-10 lg:px-12 xl:px-16 2xl:px-24">
                <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
              </div>
            </main>
          </TasksProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}

// Fallback loading screen to prevent UI freezing
function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-blue-500"></div>
    </div>
  );
}
