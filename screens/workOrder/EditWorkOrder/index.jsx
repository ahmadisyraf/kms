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
import toast from "react-hot-toast";

export default function EditWorkOrderScreen() {
  const router = useRouter();
  const { id } = router.query;
  const [workOrder, setWorkOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Set isLoading to true when submitting

      const updateWorkOrder = await fetch(`/api/workOrder/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workOrder),
      });

      if (!updateWorkOrder.ok) {
        console.log("pariah");
      }

      console.log("Succes bro");
      setIsLoading(false); // Set isLoading to true when submitting

      router.push("/work-order");
      toast.success("Work order edited!");
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false); // Set isLoading to true when submitting
    }
  };

  const handleChangeAssignee = (event, newValue) => {
    setWorkOrder((prevData) => ({
      ...prevData,
      assignee: newValue,
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  return (
    <Container sx={{ py: 15 }}>
      <Breadcrumbs separator="›" aria-label="breadcrumbs" sx={{ mb: 5, p: 0 }}>
        <Link href="/">Home</Link>
        <Link href="/work-order">Work Order</Link>
        <Typography>Edit Work Order</Typography>
      </Breadcrumbs>

      <Typography level="h2" sx={{ mb: 5 }}>
        Edit Work Order
      </Typography>

      <Card variant="outlined">
        <Box sx={{ width: "100%" }}>
          <Stack direction="column" spacing={2}>
            <FormControl>
              <FormLabel>Assignee</FormLabel>
              <Select
                placeholder="Choose assignee"
                value={workOrder?.assignee || ""}
                onChange={handleChangeAssignee}
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
                value={workOrder ? formatDate(workOrder?.date) : ""}
                onChange={(e) =>
                  setWorkOrder((prevData) => ({
                    ...prevData,
                    date: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Note</FormLabel>
              <Input
                size="md"
                variant="outlined"
                value={workOrder?.note || ""}
                onChange={(e) =>
                  setWorkOrder((prevData) => ({
                    ...prevData,
                    note: e.target.value,
                  }))
                }
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="solid"
                size="sm"
                sx={{ height: 20, width: 100 }}
                onClick={handleSubmit} // Attach the submit handler
                loading={isLoading ? true : false}
                loadingPosition="start"
              >
                {isLoading ? "Submitting" : "Submit"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Card>
    </Container>
  );
}
