import DashboardLayout from "@/layouts/dashboard";
import { Box, Breadcrumbs, Button, Sheet, Typography, Alert } from "@mui/joy";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import Link from "next/link";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react").then((module) => module.default), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import animation from "../../../public/empty.json";

export default function ViewApplicationPage() {
  return (
    <DashboardLayout>
      <Box sx={{ mt: 10 }}>
        <Breadcrumbs
          separator={<IoIosArrowForward />}
          aria-label="breadcrumbs"
          sx={{ px: 0 }}
        >
          {["Dashboard", "Kiosk application"].map((item) => (
            <Link key={item} color="neutral" href="#separators">
              {item}
            </Link>
          ))}
        </Breadcrumbs>

        <Typography level="h2">Kiosk application</Typography>

        <Box sx={{ mt: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Link href={"/kiosk-application/user/apply-kiosk"}>
              <Button sx={{ mr: 1 }} startDecorator={<IoIosAdd size={20} />}>
                New application
              </Button>
            </Link>
          </Box>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: 15,
              mt: 2,
              position: "relative",
              py: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ position: "relative", width: 300 }}>
              <Lottie animationData={animation} loop={true} />
              <Typography level="h3" textAlign={"center"}>
                No application found
              </Typography>
            </Box>
          </Sheet>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
