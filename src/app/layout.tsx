import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";

import BuyCoffeeBtn from "@/components/BuyCoffeeBtn";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import NavBar from "@/components/NavBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
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
    images: [
      {
        url: "https://www.minimalpricing.com/main-image.png",
        width: 1200,
        height: 630,
        alt: "Contract Pricing Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract Pricing Calculator | Estimate Project Costs",
    description:
      "Easily estimate contract pricing, including labor, material, and additional fees.",
    images: ["https://www.minimalpricing.com/main-image.png"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.minimalpricing.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProjectProvider initialProjectData={projectData}>
            <TasksProvider>
              <div className="flex min-h-screen flex-col">
                {/* Header */}
                <header className="sticky left-0 top-0 z-10 flex w-full items-center justify-between border-b p-2">
                  <Link
                    className="rounded-2xl px-4 py-3 text-2xl font-semibold text-neutral-800 hover:bg-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                    href="/"
                  >
                    Minimal Pricing
                  </Link>

                  {/* Buttons */}
                  <div className="flex gap-2 px-4">
                    <ThemeSwitcher />
                    <BuyCoffeeBtn />
                  </div>
                </header>

                {/* Content */}
                <div className="flex flex-1">
                  {/* Sidebar */}
                  <aside className="sticky left-0 top-[74px] h-[calc(100vh-74px)] w-[100px] border-r">
                    <NavBar />
                    {/* <p>Hi</p> */}
                  </aside>

                  {/* Content */}
                  <div className="flex w-full flex-col">
                    <main className="flex flex-1 items-center justify-center">
                      <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
                    </main>

                    {/* Footer */}
                    <footer className="sticky bottom-0 right-0 h-12 border-t px-4 py-3 text-center">
                      <p className="text-sm">
                        &copy; {new Date().getFullYear()} Minimal Pricing | All Rights Reserved.
                      </p>
                    </footer>
                  </div>
                </div>
              </div>
            </TasksProvider>
          </ProjectProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
