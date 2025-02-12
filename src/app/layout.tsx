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
      <body className="my-24 flex w-screen items-center justify-center">
        <TasksProvider>{children}</TasksProvider>
      </body>
    </html>
  );
}
