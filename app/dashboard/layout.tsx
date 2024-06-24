import Header from "@/components/reusable/Header";
import { Sidebar } from "@/components/reusable/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col sm:pl-56 w-full">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
