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

export default function CreateWorkOrderScreen() {
  const router = useRouter();
  const [selectedComplaint, setSelectedComplaint] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [workOrder, setWorkOrder] = useState({
    assignee: "",
    date: "",
    note: "",
    complaint: null,
  });

  const handleChangeAssignee = (event, newValue) => {
    setWorkOrder((prevData) => ({
      ...prevData,
      assignee: newValue,
    }));
  };

  const fetchComplaint = async () => {
    const getComplaint = await fetch(`/api/complaint`, {
      method: "GET",
    });

    if (!getComplaint.ok) {
      throw new Error("Something wrong, please contact our support");
    }

    const data = await getComplaint.json();
    if (data) {
      setSelectedComplaint(data);
      console.log("hehe", selectedComplaint);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [selectedComplaint]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if required fields are filled
    if (!selectedComplaintId) {
      toast.error("Complaint ID is required.");
      return;
    }

    if (!workOrder.assignee) {
      toast.error("Assignee is required.");
      return;
    }

    if (!workOrder.date) {
      toast.error("Date is required.");
      return;
    }

    try {
      setIsLoading(true); // Set isLoading to true when submitting

      if (!selectedComplaint) {
        console.error("No complaint selected");
        return;
      }

      console.log(selectedComplaintId, "data bitch");

      const createWorkOrder = await fetch(
        `/api/workOrder/${selectedComplaintId}`,
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
      }
      setIsLoading(false); // Set isLoading back to false

      router.push("/work-order");
      toast.success("Work order created!");

      console.log("Succes bro");
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false); // Ensure isLoading is set back to false in case of error
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
                value={selectedComplaintId || ""} // Ensure it's set to a string or empty string
                onChange={(e, newValue) => {
                  setSelectedComplaintId(newValue); // Update the selectedComplaintId state
                  // Update the workOrder state with the selected complaint
                  const selectedData = selectedComplaint.find(
                    (complaint) => complaint.complaintid === newValue
                  );
                  setWorkOrder((prevData) => ({
                    ...prevData,
                    complaint: selectedData,
                  }));
                }}
              >
                {selectedComplaint.map((d, i) => (
                  <Option key={i} value={d.complaintid}>
                    {d.complaintid}
                  </Option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Complaint Type</FormLabel>
              <Input
                value={
                  selectedComplaintId
                    ? selectedComplaint.find(
                        (complaint) =>
                          complaint.complaintid === selectedComplaintId
                      )?.type
                    : ""
                }
                readOnly
              />
            </FormControl>
            {/* <FormControl>
              <FormLabel>Kiosk Number</FormLabel>
              <Input
                value={
                  selectedComplaintId
                    ? selectedComplaint.find(
                        (complaint) =>
                          complaint.complaintid === selectedComplaintId
                      )?.type
                    : ""
                }
                readOnly
              />
            </FormControl> */}
            <FormControl>
              <FormLabel>Complaint Details</FormLabel>
              <Input
                value={
                  selectedComplaintId
                    ? selectedComplaint.find(
                        (complaint) =>
                          complaint.complaintid === selectedComplaintId
                      )?.comment
                    : ""
                }
                readOnly
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
          </Box>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 3,
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
      </Card>
    </Container>
  );
}
