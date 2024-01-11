import React from "react";
import ViewWorkOrderScreen from "@/screens/workOrder/ViewWorkOrder";
import DashboardLayout from "@/layouts/dashboard";

export default function ViewWorkOrderPage() {
  return (
    <DashboardLayout>
      <ViewWorkOrderScreen />
    </DashboardLayout>
  );
}
