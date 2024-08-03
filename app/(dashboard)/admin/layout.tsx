import NavBarAdmin from "@/components/Dashboard/admin_d_Components/a_navigation";
import React from "react";

export default function DashboardLayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div  className="flex min-h-screen w-full flex-col bg-muted/40">
      <NavBarAdmin />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</div>
    </div>
  );
}
