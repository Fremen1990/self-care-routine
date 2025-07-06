"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { ThemeToggle } from "@repo/ui/components/ui/theme-toggle";

export default function RoutineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine active tab based on current route
  const activeTab = pathname.includes("/evening") ? "evening" : "morning";

  const handleTabChange = (value: string) => {
    router.push(`/routine/${value}`);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daily Routine Tracker</h1>
        <ThemeToggle />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger
            value="morning"
            className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
          >
            ☀️ Morning Routine
          </TabsTrigger>
          <TabsTrigger
            value="evening"
            className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
          >
            🌙 Evening Routine
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {children}
    </div>
  );
}
