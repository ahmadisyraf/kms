import React from "react";
import CreateWorkOrderScreen from "@/screens/workOrder/Create";
import DashboardLayout from "@/layouts/dashboard";

export default function CreatWorkOrderPage() {
  return (
    <DashboardLayout>
      <CreateWorkOrderScreen />
    </DashboardLayout>
  );
}
