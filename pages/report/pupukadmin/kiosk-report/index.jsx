import DashboardLayout from "@/layouts/dashboard";
import {
  Box,
  Breadcrumbs,
  Sheet,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  SvgIcon,
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
      "@/screens/report/pupukadmin/kiosk-report/report-table"
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
      link: "/report/pupukadmin",
    },
    { name: "Sales Report", link: "/report/pupukadmin" },
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

        <Typography level="h2">Sales Report</Typography>
        <br />
        <Box
      sx={{
        width: '100%',
        maxWidth: 1000,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 6,
        flexGrow: 1 
      }}
    >
        <Card variant="solid" color="primary" invertedColors size="sm">
                <CardContent> 
                    <Typography level="body-md">Total Sales</Typography> 
                    <Typography level="h2">RM 432.6M</Typography>
                </CardContent>
            </Card>

            <Card variant="solid" color="primary" invertedColors size="sm">
                <CardContent> 
                    <Typography level="body-md">Total Kiosk</Typography> 
                    <Typography level="h2">432</Typography>
                </CardContent>
            </Card>

            <Card variant="solid" color="primary" invertedColors size="sm">
                <CardContent> 
                    <Typography level="body-md">Total Invoices</Typography> 
                    <Typography level="h2">2000</Typography>
                </CardContent>
            </Card>
        
    </Box>

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
