import type { Metadata } from "next";
import "../styles/globals.css";

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
      <body className="flex items-center justify-center h-screen w-screen">
        <TasksProvider>{children}</TasksProvider>
      </body>
    </html>
  );
}
