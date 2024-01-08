import Link from "next/link";
import dynamic from "next/dynamic";
import DashboardLayout from "@/layouts/dashboard";
import { Box, Button, Sheet, Typography } from "@mui/joy";
import { IoIosAdd } from "react-icons/io";
const Lottie = dynamic(
  () => import("lottie-react").then((module) => module.default),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
const ApplicationTable = dynamic(
  () =>
    import(
      "@/screens/kiosk-application/user/view-application/application-table"
    ),
  { ssr: false, loading: () => <p>Loading...</p> }
);

const CustomBreadcrumbs = dynamic(
  () => import("@/components/CustomBreadcrumbs"),
  { ssr: false, loading: () => <p>Loading...</p> }
);
import animation from "../../../public/empty.json";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const breadcrumbs = [
  {
    name: "Dashboard",
    link: "/kiosk-application/user",
  },
  { name: "Kiosk application", link: "/kiosk-application/user" },
];

export default function ViewApplicationPage() {
  const [applications, setApplications] = useState();
  const [isLoading, setIsLoading] = useState();
  const { userId } = useAuth();

  const fetchApplications = async () => {
    setIsLoading(true);
    const applications = await fetch(`/api/application/${userId}`, {
      method: "GET",
    });

    if (!applications.ok) {
      throw new Error("Something wrong, please contact our support");
    }

    const data = await applications.json();
    setApplications(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, [userId]);

  return (
    <DashboardLayout>
      <Box sx={{ mt: 10 }}>
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
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
                {applications && applications.length > 0 ? (
                  <ApplicationTable applications={applications} />
                ) : (
                  <Box sx={{ position: "relative", width: 300 }}>
                    <Lottie animationData={animation} loop={true} />
                    <Typography level="h3" textAlign={"center"}>
                      No application found
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Sheet>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
