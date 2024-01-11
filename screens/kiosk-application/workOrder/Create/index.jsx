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

const dummyData = [
  {
    complaintId: 1,
    kioskNumber: "K001",
    complaintTitle: "Broken Kiosk Display",
    complaintType: "Hardware",
    complaintNote:
      "The display screen of the kiosk is not functioning properly.",
  },
  {
    complaintId: 2,
    kioskNumber: "K002",
    complaintTitle: "Software Glitch",
    complaintType: "Software",
    complaintNote: "The software application on the kiosk crashes frequently.",
  },
  {
    complaintId: 3,
    kioskNumber: "K003",
    complaintTitle: "Slow Response Time",
    complaintType: "Performance",
    complaintNote: "The kiosk takes too long to process user requests.",
  },
  {
    complaintId: 4,
    kioskNumber: "K004",
    complaintTitle: "Network Connectivity Issues",
    complaintType: "Network",
    complaintNote: "The kiosk frequently loses connection to the network.",
  },
  {
    complaintId: 5,
    kioskNumber: "K005",
    complaintTitle: "Touchscreen Malfunction",
    complaintType: "Hardware",
    complaintNote: "The touchscreen on the kiosk is unresponsive at times.",
  },
];

export default function CreateWorkOrderScreen() {
  const [selectedComplaintTitle, setSelectedComplaintTitle] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null); // Added state for selected complaint
  const [workOrder, setWorkOrder] = useState({
    assignee: "",
    date: "",
    note: "",
    complaint: null,
  });

  // Function to get the complaint data based on the title
  const getComplaintData = (title) => {
    return dummyData.find((item) => item.complaintTitle === title);
  };

  const handleChange = (event, newValue) => {
    setSelectedComplaintTitle(newValue);
    setSelectedComplaint(getComplaintData(newValue)); // Update selectedComplaint state
    setWorkOrder((prevData) => ({
      ...prevData,
      complaint: getComplaintData(newValue),
    }));
  };

  const handleChangeAssignee = (event, newValue) => {
    setWorkOrder((prevData) => ({
      ...prevData,
      assignee: newValue,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedComplaint) {
        // Handle case where no complaint is selected
        console.error("No complaint selected");
        return;
      }

      console.log(selectedComplaint.complaintId,"data bitch")

      const createWorkOrder = await fetch(
        `/api/workOrder/${selectedComplaint.complaintId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workOrder),
        }
      );

      if (!createWorkOrder.ok) {
        console.log("pariah");
        // You might want to handle successful creation here, e.g., navigate to a success page or reset the form.
      }

      console.log("Succes bro")
    } catch (error) {
      // Handle other errors, e.g., network issues
      console.error("An error occurred:", error);
      // Assuming you have a toast library like react-toastify or a similar one to show error messages
      // toast.error("Please check internet connection, or contact our support");
    }
  };

  return (
    <Container sx={{ py: 15 }}>
      <Breadcrumbs separator="›" aria-label="breadcrumbs" sx={{ mb: 5, p: 0 }}>
        <Link href="/">Home</Link>
        <Link href="/work-order">Work Order</Link>
        <Typography>Create Work Order</Typography>
      </Breadcrumbs>

      <Typography level="h2" sx={{ mb: 5 }}>
        Create Work Order
      </Typography>

      <Card variant="outlined">
        <Stack direction="row" spacing={2}>
          <Box sx={{ width: "100%" }}>
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
          </Box>
          <Divider orientation="vertical" />
          <Box sx={{ width: "100%" }}>
            <FormControl>
              <FormLabel>Assignee</FormLabel>
              <Select
                placeholder="Choose assignee"
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
