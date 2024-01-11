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

export default function EditWorkOrderScreen() {
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateWorkOrder = await fetch(`/api/workOrder/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workOrder),
      });

      if (!updateWorkOrder.ok) {
        console.log("pariah");
        // You might want to handle successful creation here, e.g., navigate to a success page or reset the form.
      }

      console.log("Succes bro");
    } catch (error) {
      // Handle other errors, e.g., network issues
      console.error("An error occurred:", error);
      // Assuming you have a toast library like react-toastify or a similar one to show error messages
      // toast.error("Please check internet connection, or contact our support");
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
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1 and pad with 0 if necessary
    const day = String(d.getDate()).padStart(2, "0"); // Pad with 0 if necessary

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
        <Stack direction="row" spacing={2}>
          {/* <Box sx={{ width: "100%" }}>
            <FormControl>
              <FormLabel>Complaint ID</FormLabel>
              <Select
                placeholder="Choose complaint"
                value={selectedComplaintTitle} // Bind the value to the state
                onChange={handleChange} // Attach the onChange handler
              >
                {dummyData.map((item, index) => (
                  <Option key={index} value={item.complaintTitle}>
                    {item.complaintTitle}
                  </Option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Complaint Type</FormLabel>
              <Input
                value={selectedComplaint ? selectedComplaint.complaintType : ""}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Kiosk Number</FormLabel>
              <Input
                value={selectedComplaint ? selectedComplaint.kioskNumber : ""}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Complaint Details</FormLabel>
              <Input
                value={selectedComplaint ? selectedComplaint.complaintNote : ""}
                disabled
              />
            </FormControl>
          </Box> */}
          <Divider orientation="vertical" />
          <Box sx={{ width: "100%" }}>
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
            <Button
              variant="solid"
              size="sm"
              sx={{ height: 20 }}
              onClick={handleSubmit} // Attach the submit handler
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
}
