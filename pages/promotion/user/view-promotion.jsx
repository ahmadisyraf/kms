import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import { useAuth } from "@clerk/nextjs";
import {
  Typography,
  Box,
  Card,
  Table,
} from "@mui/joy";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import toast from "react-hot-toast";
import DashboardLayout from "@/layouts/dashboard";

export default function CreatePromotion() {
  const { isSignedIn } = useAuth();
  const [promotion, setPromotion] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPromotion = async () => {
    try {
      const dbData = await fetch(
        `/api/promotion/${"6582970981db07df46dba0ac"}`,
        {
          method: "GET",
        }
      );

      if (!dbData.ok) {
        throw new Error("Something went wrong! Please contact our support.");
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

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter promotions based on search query
  const filteredPromotions = promotion.filter((promo) => {
    const searchTerms = Object.values(promo).map((value) =>
      String(value).toLowerCase()
    );
    return searchTerms.some((term) => term.includes(searchQuery.toLowerCase()));
  });

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
          <Box sx={{ p: 2 }}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search promotions"
              style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
            />
          </Box>
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
              {filteredPromotions.map((d, index) => (
                <tr key={index}>
                  <td>{d.promoid}</td>
                  <td>{d.title}</td>
                  <td>{d.startDate}</td>
                  <td>On</td>
                  <td>{d.productName}</td>
                  <td>
                    <Button color="primary" variant="soft">
                      View
                    </Button>
                    <Button
                      variant="soft"
                      color="danger"
                      onClick={() => handleDelete(d.promoid)}
                    >
                      Delete
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
