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
  title: "Contract Pricing Calculator | Accurate Project Cost Estimates",
  description:
    "Estimate contract pricing with precision. Calculate labor, material, and additional costs in one place. Perfect for contractors, freelancers, and businesses.",
  keywords:
    "contract pricing, cost estimation, project budgeting, contractor calculator, labor costs, material pricing, pricing calculator",
  openGraph: {
    title: "Contract Pricing Calculator | Estimate Project Costs",
    description:
      "Easily estimate contract pricing, including labor, material, and additional fees.",
    type: "website",
    url: "https://www.minimalpricing.com",
    // images: [
    //   {
    //     url: "https://yourwebsite.com/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Contract Pricing Calculator",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract Pricing Calculator | Estimate Project Costs",
    description:
      "Easily estimate contract pricing, including labor, material, and additional fees.",
    // images: ["https://yourwebsite.com/twitter-image.jpg"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.minimalpricing.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProjectProvider initialProjectData={projectData}>
            <TasksProvider>
              {/* Header */}
              <header className="w-full bg-gray-100 px-4 py-3 text-center dark:bg-gray-800">
                <h1 className="text-2xl font-bold">Contract Pricing Calculator</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Calculate labor, material, and additional costs easily.
                </p>
              </header>

              {/* Main Content */}
              <main className="flex w-full flex-1 flex-col items-center justify-center">
                <div className="fixed right-4 top-[5.6rem] z-50">
                  <ThemeToggle />
                </div>

                <div className="w-full max-w-3xl px-2 sm:max-w-4xl sm:px-6 md:max-w-5xl md:px-10 lg:px-12 xl:px-16 2xl:px-24">
                  <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
                </div>
              </main>

              {/* Footer */}
              <footer className="mt-4 w-full bg-gray-100 px-4 py-3 text-center dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  &copy; {new Date().getFullYear()} Minimal Pricing | All Rights Reserved.
                </p>
              </footer>
            </TasksProvider>
          </ProjectProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

// Fallback loading screen
function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-blue-500"></div>
    </div>
  );
}
