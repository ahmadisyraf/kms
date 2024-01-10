import DashboardLayout from "@/layouts/dashboard";
import { Box, Button, Sheet, Typography } from "@mui/joy";
import dynamic from "next/dynamic";
const Lottie = dynamic(
  () => import("lottie-react").then((module) => module.default),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
import successAnimation from "../../../public/success.json";
import failsAnimation from "../../../public/fail.json";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Success() {
  const router = useRouter();

  const { success } = router.query;
  
  return (
    <DashboardLayout>
      <Box sx={{ mt: 17 }}>
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
          <Box sx={{ position: "relative", width: 300 }}>
            {success === "true" ? (
              <>
                <Lottie animationData={successAnimation} loop={true} />
                <Typography level="h3" textAlign={"center"}>
                  Thank you! We successfuly receive your payment
                </Typography>
              </>
            ) : (
              <>
                <Lottie animationData={failsAnimation} loop={true} />
                <Typography level="h3" textAlign={"center"}>
                  We're sorry, we unable to receive your payment.
                </Typography>
              </>
            )}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Link href={"/"}>
                <Button variant="plain" sx={{ mt: 2 }}>
                  Back to home
                </Button>
              </Link>
            </Box>
          </Box>
        </Sheet>
      </Box>
    </DashboardLayout>
  );
}
