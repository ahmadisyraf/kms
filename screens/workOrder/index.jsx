import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import {
  Table,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Button,
  Card,
  IconButton,
} from "@mui/joy";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import animation from "../../public/empty.json";
const Lottie = dynamic(
  () => import("lottie-react").then((module) => module.default),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
import Loader from "@/components/Loader";
export default function WorkOrderScreen() {
  const [workOrder, setWorkOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleCreate = () => {
    router.push("/work-order/create-work-order");
  };
  const fetchWorkOrder = async () => {
    setIsLoading(true);
    const getWorkOrder = await fetch(`/api/workOrder`, {
      method: "GET",
    });

    if (!getWorkOrder.ok) {
      throw new Error("Something wrong, please contact our support");
    }

    const data = await getWorkOrder.json();
    console.log(data);
    setIsLoading(false);
    setWorkOrder(data);
    console.log(workOrder);
  };

  useEffect(() => {
    fetchWorkOrder();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/workOrder/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete work order");
      }

      // Remove the deleted work order from the state
      setWorkOrder((prevWorkOrders) =>
        prevWorkOrders.filter((work) => work.id !== id)
      );

      toast.success("Work order deleted!");
    } catch (error) {
      console.error("Error deleting work order:", error);
    }
  };

  return (
    <Container sx={{ py: 15, height: "100%" }}>
      <Breadcrumbs separator="›" aria-label="breadcrumbs" sx={{ mb: 5, p: 0 }}>
        <Link href="/">Home</Link>
        <Typography>Work Order</Typography>
      </Breadcrumbs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Typography level="h2">Work Order</Typography>
        <Button
          variant="solid"
          size="sm"
          sx={{ height: 20 }}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Box>
      <Card variant="outlined">
        <Table sx={{ "& thead th:nth-child(1)": { width: "40%" } }}>
          <thead>
            <tr>
              <th>Complaint Id</th>
              <th>Assigned To</th>
              <th>Scheduled Date</th>
              <th>Note</th>
              <th style={{ display: "flex", justifyContent: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5">
                  {/* Set colspan to span across all columns */}
                  <Box
                    sx={{
                      height: "100%", // Define a height for the table cell
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center", // Center content vertically
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%", // Define a height for the table cell
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", // Center content vertically
                        my: 3
                      }}
                    >
                      <Loader />
                    </Box>
                  </Box>
                </td>
              </tr>
            ) : (
              <>
                {workOrder && workOrder.length > 0 ? (
                  <>
                    {workOrder.map((d, i) => (
                      <tr key={i}>
                        <td>{d.complaintId}</td>
                        <td>{d.assignee}</td>
                        <td>{new Date(d.date).toLocaleDateString()}</td>
                        <td
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {d.note === "" ? "-" : d.note}
                        </td>
                        <td>
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <IconButton
                              variant="outlined"
                              size="sm"
                              onClick={() => handleDelete(d.id)}
                            >
                              <MdDelete style={{ fontSize: 20 }} />
                            </IconButton>

                            <IconButton
                              variant="outlined"
                              size="sm"
                              sx={{ ml: 1 }}
                              onClick={() =>
                                router.push(
                                  `/work-order/edit-work-order/${d.id}`
                                )
                              }
                            >
                              <MdEdit style={{ fontSize: 20 }} />
                            </IconButton>

                            <IconButton
                              variant="outlined"
                              size="sm"
                              sx={{ ml: 1 }}
                              onClick={() => router.push(`/work-order/${d.id}`)}
                            >
                              <FaEye style={{ fontSize: 20 }} />
                            </IconButton>
                          </Box>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="5">
                      {/* Set colspan to span across all columns */}
                      <Box
                        sx={{
                          height: "100%", // Define a height for the table cell
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center", // Center content vertically
                        }}
                      >
                        <Box sx={{ width: 300 }}>
                          <Lottie animationData={animation} loop={true} />
                          <Typography level="h3" textAlign={"center"}>
                            No work order found
                          </Typography>
                        </Box>
                      </Box>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
