import DashboardLayout from "@/layouts/dashboard";
import { Box, Sheet, Typography, Button } from "@mui/joy";
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
export default function ViewBillingPages() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [email, setEmail] = useState();
  const { isSignedIn } = useAuth();
  const [billing, setBilling] = useState([]);

  console.log(billing, "...ini bill");

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

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

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

  return (
    <DashboardLayout>
      <Box sx={{ mt: 10 }}>
        <Typography level="h2">{billing[0]?.application.id}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row-reverse", mt: 5 }}>
          <Button
            sx={{ mr: 1 }}
            variant="solid"
            startDecorator={<IoIosAdd size={20} />}
            onClick={createCheckOutSession}
            loading={isPaymentLoading}
          >
            New payment
          </Button>
        </Box>
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
            <Box>
              <Box sx={{ position: "relative", width: 300 }}>
                <Lottie animationData={animation} loop={true} />
                <Typography level="h3" textAlign={"center"}>
                  No billing found
                </Typography>
              </Box>
            </Box>
          )}
        </Sheet>
      </Box>
    </DashboardLayout>
  );
}
