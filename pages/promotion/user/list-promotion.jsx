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
  const handleDelete = async (promoid) => {
    try {
      const loadingToast = toast.loading("Loading, please wait");
      const deletePromotion = await fetch(`/api/promotion/${promoid}`, {
        method: "DELETE",
      });

      if (!deletePromotion.ok) {
        toast.error("Something wrong, please contact our support", {
          id: loadingToast,
        });
      } else if (deletePromotion.ok) {
        toast.success(`Promotion: ${promoid} deleted`, {
          id: loadingToast,
        });

        // router.reload();
        const deleted = await deletePromotion.json();

        console.log(deleted, "..hehe");
      }
    } catch (err) {
      toast.error("Something wrong, please contact our support", {
        id: loadingToast,
      });
    }
  };

  const { isSignedIn } = useAuth();
  const [promotion, setPromotion] = useState([]);
  const [checked, setChecked] = useState(false);

  console.log(promotion, "ini bill");

  const fetchPromotion = async () => {
    try {
      const dbData = await fetch(
        `/api/promotion/${"6582970981db07df46dba0ac"}`,
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
                <th>Promo Id</th>
                <th>Promotion Title</th>
                <th>Start date</th>
                <th>Status</th>
                <th>Product name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {promotion.map((d, index) => (
                <tr key={index}>
                  <td>{d.promoid}</td>
                  <td>{d.title}</td>
                  <td>{d.startDate}</td>
                  <td>On</td>
                  <td sx={{ width:"100%"}}>{d.productName}</td>
                  <td >   <Button sx={{ mr: 0.2}} color="primary"variant="soft">View</Button><Button sx={{ mr: 0.2}} variant="soft"color="danger" onClick={() => handleDelete(d.promoid)}>Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
