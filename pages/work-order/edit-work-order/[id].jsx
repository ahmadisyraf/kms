import React from "react";
import EditWorkOrderScreen from "@/screens/workOrder/EditWorkOrder";
import DashboardLayout from "@/layouts/dashboard";

export default function ViewWorkOrderPage() {
  return (
    <DashboardLayout>
      <EditWorkOrderScreen />
    </DashboardLayout>
  );
}
