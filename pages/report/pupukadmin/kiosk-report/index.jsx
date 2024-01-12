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

const ReportTable = dynamic(
  () =>
    import(
      "@/screens/report/pupukadmin/kiosk-report/report-table"
    ),
  { ssr: false, loading: () => <p>Loading...</p> }
);
import Loader from "@/components/Loader";

export default function ViewSalesReportPage() {
  const [reports, setReports] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [resBillingTotal, setResBillingTotal] = useState();
  const [billingTotal, setBillingTotal] = useState();

  const fetchBillingAmount = async () => {
    try {
      const dbData = await fetch(
        `/api/report/${"6582970981db07df46dba0ac"}`,
        {
          method: "GET",
        }
      );
      const data = await dbData.json();

      // Fetch total amount from the 'billing' model
      const billingTotal = await fetch("/api/report?filter=total", {
        method: "GET",
      });

      if (!billingTotal.ok) {
        throw new Error("Failed to fetch billing total");
      }

      const resBillingTotal = await billingTotal.json();

      // Fetch total amount from the 'user' model
      const userTotal = await fetch("/api/report?filter=total", {
        method: "GET",
      });

      if (!userTotal.ok) {
        throw new Error("Failed to fetch user total");
      }

      const resUserTotal = await userTotal.json();

      // Log the results
      console.log(resBillingTotal, "...billing total");
      console.log(resUserTotal, "...user total");

      // Set the state using the setter
      setResBillingTotal(resBillingTotal);
      setBillingTotal(billingTotal);
      
    } catch (err) {
      console.error(err);
    }
  };

  // Use useEffect for component lifecycle methods
  useEffect(() => {
    fetchBillingAmount();
  }, []); // empty dependency array means this effect runs once after the initial render


  const breadcrumbs = [
    {
      name: "Dashboard",
      link: "/report/pupukadmin/",
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
                    <Typography level="h2">RM 12345</Typography>
                </CardContent>
            </Card>

            <Card variant="solid" color="primary" invertedColors size="sm">
                <CardContent> 
                    <Typography level="body-md">Total Kiosk</Typography> 
                    <Typography level="h2">12</Typography>
                </CardContent>
            </Card>

            <Card variant="solid" color="primary" invertedColors size="sm">
                <CardContent> 
                    <Typography level="body-md">Total Invoices</Typography> 
                    <Typography level="h2">423</Typography>
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
                {reports && reports.length > 0 ? (
                  <ReportTable reports={reports} />
                ) : (
                  <Box sx={{ position: "relative", width: 300 }}>
                    <Lottie animationData={animation} loop={true} />
                    <Typography level="h3" textAlign={"center"}>
                      No report found
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
