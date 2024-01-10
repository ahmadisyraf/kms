import DashboardLayout from "@/layouts/dashboard";
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
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { LineChart } from '@mui/x-charts/LineChart';

const schema = yup.object({
  inputOwnerName: yup.string().required("Owner name is required"),
  inputOwnerIC: yup.string().required("Owner IC is required"),
  inputPhoneNumber: yup.string().required("Phone number is required"),
  inputOwnerAddress: yup.string().required("Owner address is required"),
  inputBusinessName: yup.string().required("Business name is required"),
  inputBusinessSSM: yup.string().required("Business SSM number is required"),
  inputBusinessPhoneNumber: yup
    .string()
    .required("Business phone number is required"),
  inputTyphoidInjection: yup.string().required("Typhoid Injection is required"),
});
const breadcrumbs = [
  {
    name: "Dashboard",
    link: "/kiosk-application/admin",
  },
  { name: "Kiosk application", link: "/kiosk-application/admin" },
  {
    name: "View Report",
    link: "#",
  },
];

export default function ViewKioskReportPage() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const applicationId = router.query.id;
  const [application, setApplications] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const applications = await fetch(
        `/api/application/${applicationId}?type=application`,
        {
          method: "GET",
        }
      );

      if (!applications.ok) {
        throw new Error("Something wrong, please contact our support");
      }

      const data = await applications.json();

      setApplications(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId) {
      fetchApplications();
    }
  }, [applicationId]);

  const onSubmit = (data) => console.log(data);

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
          onSubmit={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <Stack direction={"column"} spacing={2}>
                <Input readOnly value={application?.business.name} />
                <br/>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={500}
                    height={300}
                />
              <FormControl error={errors?.inputBusinessName}>
                <FormLabel>Business name:</FormLabel>
                <Input readOnly value={application?.business.name} />
              </FormControl>
              <FormControl error={errors?.inputBusinessSSM}>
                <FormLabel>Business SSM:</FormLabel>
                <Input readOnly value={application?.business.phoneNo} />
              </FormControl>
              <FormControl error={errors?.inputBusinessPhoneNumber}>
                <FormLabel>Business phone number:</FormLabel>
                <Input
                  startDecorator="+60"
                  readOnly
                  value={application?.business.phoneNo}
                />
              </FormControl>
              <FormControl error={errors?.inputTyphoidInjection}>
                <FormLabel>Typhoid Injection:</FormLabel>
                <Input
                  readOnly
                  value={application?.business.typhoidInjection}
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          )}
        </Card>
      </Box>
    </DashboardLayout>
  );
}
