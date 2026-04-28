
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLayout } from "@/auth/components/layout/nav.layout";
import { HeaderLayout } from "@/auth/components/layout/header.layout";

export const Dashboard = () => {
  const [selectedLabel, setSelectedLabel] = useState("Analytics");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavLayout onSelect={setSelectedLabel} />

      <div className="flex flex-col flex-1">
        <HeaderLayout selectedLabel={selectedLabel} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
