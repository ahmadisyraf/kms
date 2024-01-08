import DashboardLayout from "@/layouts/dashboard";
import {
  Box,
  Breadcrumbs,
  Sheet,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import dynamic from "next/dynamic";
const Lottie = dynamic(
  () => import("lottie-react").then((module) => module.default),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
import animation from "../../../../public/empty.json";
import { useEffect, useState } from "react";
const ApplicationTable = dynamic(
  () =>
    import(
      "@/screens/kiosk-application/admin/view-application/application-table"
    ),
  { ssr: false, loading: () => <p>Loading...</p> }
);
import Loader from "@/components/Loader";

export default function ViewApplicationPage() {
  const [applications, setApplications] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchApplications = async () => {
    setIsLoading(true);
    const applications = await fetch(`/api/application`, {
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
  }, []);

  const breadcrumbs = [
    {
      name: "Dashboard",
      link: "/kiosk-application/admin",
    },
    { name: "Kiosk application", link: "/kiosk-application/admin" },
  ];

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

        <Typography level="h2">Kiosk application</Typography>

        <Box sx={{ mt: 5 }}>
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
