import "../styles/globals.css";

import type { Metadata } from "next";

import { TasksProvider } from "@/context/TasksContext";

export const metadata: Metadata = {
  title: "Contract Pricing",
  description: "Contract pricing calculator app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-screen items-center justify-center bg-gray-50">
        <TasksProvider>
          <div className="w-full max-w-5xl p-6 md:p-10 lg:p-12 xl:p-16">{children}</div>
        </TasksProvider>
      </body>
    </html>
  );
}
