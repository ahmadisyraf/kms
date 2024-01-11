import React from "react";
import WorkOrderScreen from "@/screens/workOrder";
import DashboardLayout from "@/layouts/dashboard";

export default function WorkOrderPage() {
  return (
    <DashboardLayout>
      <WorkOrderScreen />
    </DashboardLayout>
  );
}
