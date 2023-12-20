import DashboardLayout from "@/layouts/dashboard";
import {
  Box,
  Breadcrumbs,
  Card,
  Typography,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Button,
  Sheet,
  styled,
  SvgIcon,
  Select,
  Option,
  AspectRatio,
} from "@mui/joy";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

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
    name: "View application",
    link: "#",
  },
];

export default function ApplyKioskPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const applicationId = router.query.id;
  const [application, setApplications] = useState();

  const fetchApplications = async () => {
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

      console.log(data, "...application");

      setApplications(data);
    } catch (error) {
      console.error(error);
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

        <Typography level="h2">View application</Typography>

        <Card
          variant="outlined"
          sx={{ mt: 5 }}
          color="neutral"
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} spacing={2}>
            <FormControl error={errors.inputOwnerName ? true : false}>
              <FormLabel>Owner name:</FormLabel>
              <Input readOnly value={application?.owner.name} />
            </FormControl>
            <FormControl error={errors?.inputOwnerIC}>
              <FormLabel>Owner IC:</FormLabel>
              <Input readOnly value={application?.owner.ic} />
            </FormControl>
            <FormControl error={errors?.inputImage}>
              <FormLabel>Owner IC image:</FormLabel>
              <Sheet
                variant="outlined"
                sx={{
                  py: 2,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <AspectRatio
                  variant="outlined"
                  ratio="1"
                  objectFit="cover"
                  sx={{ width: 200, borderRadius: 15 }}
                >
                  <img
                    src={application?.owner.icImage}
                    alt="user ic"
                    loading="lazy"
                  />
                </AspectRatio>
              </Sheet>
            </FormControl>
            <FormControl error={errors?.inputPhoneNumber}>
              <FormLabel>Owner phone number:</FormLabel>
              <Input
                startDecorator="+60"
                readOnly
                value={application?.owner.phoneNo}
              />
            </FormControl>
            <FormControl error={errors?.inputOwnerAddress}>
              <FormLabel>Owner mailing address:</FormLabel>
              <Input readOnly value={application?.owner.address} />
            </FormControl>
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
              <Input readOnly value={application?.business.typhoidInjection} />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
