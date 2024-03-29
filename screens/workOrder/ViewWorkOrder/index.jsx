import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Button,
  Card,
  Grid,
  Divider,
  Input,
  Select,
  Option,
  Stack,
  FormControl,
  FormLabel,
  MenuItem,
} from "@mui/joy";
import { useRouter } from "next/router";

export default function ViewWorkOrderScreen() {
  const router = useRouter();
  const { id } = router.query;
  const [workOrder, setWorkOrder] = useState();

  const fetchWorkOrder = async () => {
    const getWorkOrder = await fetch(`/api/workOrder/${id}`, {
      method: "GET",
    });

    if (!getWorkOrder.ok) {
      throw new Error("Something wrong, please contact our support");
    }

    const responseData = await getWorkOrder.json();

    const workOrderData = responseData.data;

    console.log("Fetched work order data:", workOrderData);

    if (workOrderData) {
      setWorkOrder(workOrderData);
      console.log("haha:", workOrder);
    }
  };

  useEffect(() => {
    fetchWorkOrder();
  }, [workOrder]);

  return (
    <Container sx={{ py: 15 }}>
      <Breadcrumbs separator="›" aria-label="breadcrumbs" sx={{ mb: 5, p: 0 }}>
        <Link href="/">Home</Link>
        <Link href="/work-order">Work Order</Link>
        <Typography>View Work Order</Typography>
      </Breadcrumbs>

      <Typography level="h2" sx={{ mb: 5 }}>
        View Work Order
      </Typography>

      <Card variant="outlined">
        <Stack direction="row" spacing={2}>
          <Box sx={{ width: "100%" }}>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Complaint ID</FormLabel>
                <Input
                  value={
                    workOrder?.complaint.complaintid
                      ? workOrder.complaint.complaintid
                      : ""
                  }
                  readOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>Complaint Type</FormLabel>
                <Input
                  value={
                    workOrder?.complaint.type ? workOrder.complaint.type : ""
                  }
                  readOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Complaint Details</FormLabel>
                <Input
                  value={
                    workOrder?.complaint.comment
                      ? workOrder.complaint.comment
                      : ""
                  }
                  readOnly
                />
              </FormControl>
            </Stack>
          </Box>
          <Divider orientation="vertical" />
          <Box sx={{ width: "100%" }}>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Assignee</FormLabel>
                <Select
                  placeholder="Choose assignee"
                  value={workOrder?.assignee || ""}
                  readOnly
                >
                  <Option value="IT Team">IT Team</Option>
                  <Option value="Kiosk Management">Kiosk Management</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Date Scheduled</FormLabel>

                <Input
                  type="date"
                  size="md"
                  readOnly
                  value={
                    workOrder
                      ? new Date(workOrder?.date).toISOString().split("T")[0]
                      : ""
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Note</FormLabel>
                <Input
                  size="md"
                  variant="outlined"
                  readOnly
                  value={workOrder?.note || ""}
                />
              </FormControl>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
}
