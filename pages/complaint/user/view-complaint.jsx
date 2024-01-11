import Button from "@mui/joy/Button";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import {
  Typography,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Textarea,
  Card,
  Table,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Switch,
  Alert,
  Sheet,
} from "@mui/joy";
import DashboardLayout from "@/layouts/dashboard";
import { MoreVert, Add, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";

export default function CreateComplaint() {
  const [variant, setVariant] = React.useState('solid');
  const handleDelete = async (complaintid) => {
    try {
      const loadingToast = toast.loading("Loading, please wait");
      const deleteComplaint = await fetch(`/api/complaint/${complaintid}`, {
        method: "DELETE",
      });

      if (!deleteComplaint.ok) {
        toast.error("Something wrong, please contact our support", {
          id: loadingToast,
        });
      } else if (deleteComplaint.ok) {
        toast.success(`Complaint: ${complaintid} deleted`, {
          id: loadingToast,
        });

        // router.reload();
        const deleted = await deleteComplaint.json();

        console.log(deleted, "..hehe");
      }
    } catch (err) {
      toast.error("Something wrong, please contact our support", {
        id: loadingToast,
      });
    }
  };

  const { isSignedIn } = useAuth();
  const [complaint, setComplaint] = useState([]);
  const [checked, setChecked] = useState(false);

  console.log(complaint, "ini bill");

  const fetchComplaint = async () => {
    try {
      const dbData = await fetch(
        `/api/complaint/${"6582970981db07df46dba0ac"}`,
        {
          method: "GET",
        }
      );

      if (!dbData) {
        toast.error("Something went wrong! Please contact our support.");
      }

      const data = await dbData.json();

      setComplaint(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchComplaint();
    }
  }, [isSignedIn]);
  return (
    <DashboardLayout>
      <Box>
        <Typography level="h1" color="secondary" fontSize={35} sx={{ mt: 15 }}>
          Kiosk Complaint
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Link href="/complaint/user/create-complaint">
            <Button sx={{ ml: 150, mt: 1.5 }} startDecorator={<Add />}>
              New Complaint
            </Button>
          </Link>
        </Box>
        <Card size="lg" sx={{ mt: 2 }}>
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Complaint Type</th>
                <th>Application Id</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaint.map((d, index) => (
                <tr key={index}>
                  <td>{d.complaintid}</td>
                  <td>{d.type}</td>
                  <td>{d.applicationId}</td>
                  <td>{d.comment}</td>
                  <td><Box sx={{ display: "flex", alignItems: "center" }}>
                <Sheet
                  variant="solid"
                  color={
                    d.status === "approve"
                      ? "success"
                      : d.status === "reject"
                      ? "danger"
                      : "primary"
                  }
                  sx={{
                    width: "fit-content",
                    color: "white",
                    px: 1,
                    py: 0.1,
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    mr: 1,
                  }}
                >
                  <Typography level="title-sm" color="white">
                    {d.status ? capitalizeFirstLetter(d.status) : "Pending"}
                  </Typography>
                </Sheet>
              </Box></td>
                  <td>
                    {" "}
                    <Button sx={{ mr: 0.2 }} color="primary" variant="plain">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
