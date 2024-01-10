import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";


import { useAuth } from "@clerk/nextjs";
import {
  Typography,
  Box,
  Card,
  Table,
  Switch,
  IconButton,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { Add, MoreVert } from "@mui/icons-material";
import Link from "next/link";
import toast from "react-hot-toast";
import DashboardLayout from "@/layouts/dashboard";

export default function CreatePromotion() {
  const { isSignedIn } = useAuth();
  const [promotion,setPromotion] = useState([]);
  const [checked, setChecked] = useState(false);

  console.log(promotion,"ini bill");

  const fetchPromotion = async () => {
    try {
      const dbData = await fetch(
        `/api/promotion/${"659bcdf0f76154c9f34a897a"}`,
        {
          method: "GET",
        }
      );

      if (!dbData) {
        toast.error("Something went wrong! Please contact our support.");
      }

      const data = await dbData.json();

      setPromotion(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchPromotion();
    }
  }, [isSignedIn]);

  return (
    <DashboardLayout>
      <Box>
        <Typography level="h1" color="secondary" fontSize={35} sx={{ mt: 15 }}>
          Kiosk Promotion
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Link href="/promotion/user/create-promotion">
            <Button sx={{ ml: 150, mt: 1.5 }} startDecorator={<Add />}>
              New Promotion
            </Button>
          </Link>
        </Box>
        <Card size="lg" sx={{ mt: 2 }}>
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>Status</th>
                <th>Promotion Title</th>
                <th>Start date</th>
                <th>Status</th>
                <th>Product name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Switch
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    color={checked ? "success" : "neutral"}
                    variant={checked ? "solid" : "outlined"}
                    slotProps={{
                      endDecorator: {
                        sx: {
                          minWidth: 24,
                        },
                      },
                    }}
                  />
                </td>
                <td>{promotion[0]?.title}</td>
                <td>{}</td>
                <td>On</td>
                <td>Any coffee (Small Size)</td>
                <td>
                  <Dropdown>
                    <MenuButton
                      slots={{ root: IconButton }}
                      slotProps={{
                        root: { variant: "outlined", color: "neutral" },
                      }}
                    >
                      <MoreVert />
                    </MenuButton>
                    <Menu>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>View</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </Menu>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
