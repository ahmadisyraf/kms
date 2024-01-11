import DashboardLayout from "@/layouts/dashboard";
import { Box, Sheet, Typography, Button, Breadcrumbs } from "@mui/joy";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
const Lottie = dynamic(
  () => import("lottie-react").then((module) => module.default),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
import animation from "../../../public/empty.json";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import { IoIosAdd } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import BillingTable from "@/screens/billing/user/billing-table";
export default function AdminViewBillingPages() {
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useAuth();
  const [billing, setBilling] = useState([]);

  const fetchBilling = async () => {
    try {
      setIsLoading(true);
      const dbData = await fetch(`/api/billing/`, {
        method: "GET",
      });

      if (!dbData) {
        toast.error("Something wrong! please contact our support");
      }

      const data = await dbData.json();

      setBilling(data);

      console.log(data, "..billing");

      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchBilling();
    }
  }, [isSignedIn]);

  const breadcrumbs = [
    {
      name: "Dashboard",
      link: "/kiosk-application/user",
    },
    { name: "Billing", link: "/billing/user/" },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ mt: 10 }}>
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <Typography level="h2">Billing</Typography>
        <Box
          sx={{ display: "flex", flexDirection: "row-reverse", mt: 5 }}
        ></Box>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: 15,
            mt: 2,
            position: "relative",
            py: 5,
            px: 5,
            display: "flex",
            justifyContent: "center",
            overflowY: "auto",
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {billing ? (
                <BillingTable billing={billing} />
              ) : (
                <Box>
                  <Box sx={{ position: "relative", width: 300 }}>
                    <Lottie animationData={animation} loop={true} />
                    <Typography level="h3" textAlign={"center"}>
                      No billing found
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Sheet>
      </Box>
    </DashboardLayout>
  );
}
