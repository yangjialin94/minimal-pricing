import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import { ProjectProvider } from "@/context/ProjectContext";
import { TasksProvider } from "@/context/TasksContext";
import projectData from "@/data/project-data.json";

export const metadata: Metadata = {
  title: "Contract Pricing",
  description: "Contract pricing calculator app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen w-full flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProjectProvider initialProjectData={projectData}>
            <TasksProvider>
              <main className="flex w-full flex-col items-center justify-center">
                <div className="fixed right-4 top-4 z-50">
                  <ThemeToggle />
                </div>
                <div className="w-full max-w-3xl px-2 sm:max-w-4xl sm:px-6 md:max-w-5xl md:px-10 lg:px-12 xl:px-16 2xl:px-24">
                  <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
                </div>
              </main>
            </TasksProvider>
          </ProjectProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
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
