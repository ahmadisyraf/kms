import DashboardLayout from "@/layouts/dashboard";
import * as React from 'react';
import {
  Box,
  Breadcrumbs,
  Card,
  Typography,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Sheet,
  AspectRatio,
  CircularProgress,
} from "@mui/joy";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";



ChartJS.register(
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
)


const breadcrumbs = [
  {
    name: "View Kiosk Report",
    link: "/kiosk-report/pupukadmin/kiosk-report",
  },
  { name: "Kiosk Report", link: "/kiosk-report/pupukadmin/kiosk-report" },
  {
    name: "View Report",
    link: "#",
  },
];


export default function ViewKioskReportPage() {

  const router = useRouter();
  const [email, setEmail] = useState();
  const { isSignedIn } = useAuth();
  const [billing, setBilling] = useState([]);
  const reportId = router.query.id;
  const [application, setApplications] = useState();
  const [isLoading, setIsLoading] = useState(false);

  console.log(billing, "...ini bill report");
  
  const fetchBilling = async () => {
    try {
      const dbData = await fetch(`/api/billing/${"6582970981db07df46dba0ac"}`, {
        method: "GET",
      });

      if (!dbData) {
        toast.error("Something wrong! please contact our support");
      }

      const data = await dbData.json();

      setBilling(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchBilling();
    }
  }, [isSignedIn]);

  const fetchUser = async () => {
    const currentUser = await fetch("/api/user/", {
      method: "GET",
    });

    if (!currentUser) {
      throw new Error("Something went wrong");
    }

    const getCurrent = await currentUser.json();

    setEmail(getCurrent.email);
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUser();
    }
  }, [isSignedIn]);
  const createCheckOutSession = async () => {
    setIsPaymentLoading(true);

    try {
      const approvedApplication = await fetch(
        "/api/application?filter=true&status=approve",
        {
          method: "GET",
        }
      );

      if (!approvedApplication) {
        toast.error("Something wrong, please contact our suuport");
      }

      const application = await approvedApplication.json();

      if (!application) {
        toast.error("Application not exist");
      }

      const applicationId = application[0].id;

      const stripe = await stripePromise;

      // Object with quantity and price information
      const obj = {
        quantity: 1,
        price: "price_1OWLSSDPijHFOZ8Tlvn44oJl",
        applicationId: applicationId,
        email: email,
      };

      // Fetch the checkout session data from the server
      const response = await fetch("/api/create-stripe-session", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is successful (status code 2xx)
      if (!response.ok) {
        throw new Error(
          `Failed to fetch checkout session: ${response.statusText}`
        );
      }

      // Parse the response JSON
      const checkoutSession = await response.json();

      // Check if the checkout session has an 'id' property
      if (!checkoutSession || !checkoutSession.id) {
        throw new Error("Invalid checkout session data");
      }

      // Redirect to the Stripe Checkout page
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      // Handle any errors during redirection
      if (result.error) {
        throw new Error(result.error.message);
      }

      setIsPaymentLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const data = {
    labels : ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'],
    datasets :[{
      labels: "Sales of the week",
      data: [3000,3242,2133,2233,4564,5685,5679,3644,4272,6342,3243,6962],
      backgroundColor: 'aqua',
      borderColor: 'aqua',
      pointBorderColor: 'black'
    }]
  }
  return (
    <DashboardLayout>
      <Box sx={{ mt: 10 }}>
        <Breadcrumbs
          separator={<IoIosArrowForward />}
          aria-label="breadcrumbs"
          sx={{ px: 0 }}
        >
          {breadcrumbs.map((item, index) => (
            <Link key={index} color="neutral" href={item.link}>
              {item.name}
            </Link>
          ))}
        </Breadcrumbs>

        <Typography level="h2">View Kiosk Sales Report</Typography>

        <Card
          variant="outlined"
          sx={{ mt: 5 }}
          color="neutral"
          component={"form"}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <Stack direction={"column"} spacing={2}>

              <Line 
              data = {data}
              />
              <br />

              <FormControl>
                <FormLabel>Business name:</FormLabel>
                <Input readOnly value={application?.business.name} />
              </FormControl>
              <FormControl>
                <FormLabel>Business SSM:</FormLabel>
                <Input readOnly value={application?.business.phoneNo} />
              </FormControl>
              <Button type="submit">Generate Report</Button>
            </Stack>
          )}
        </Card>
      </Box>
    </DashboardLayout>
  );
}
