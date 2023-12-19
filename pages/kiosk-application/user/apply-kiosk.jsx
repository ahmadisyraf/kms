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
} from "@mui/joy";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  inputImage: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value[0] && value[0].size <= 10 * 1024 * 1024;
    })
    .test("fileType", "Invalid file type", (value) => {
      return value && value[0] && /^image\/(jpeg|png)$/.test(value[0].type);
    }),
});

export default function ApplyKioskPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <DashboardLayout>
      <Box sx={{ mt: 10 }}>
        <Breadcrumbs
          separator={<IoIosArrowForward />}
          aria-label="breadcrumbs"
          sx={{ px: 0 }}
        >
          {["Dashboard", "Kiosk application", "New application"].map((item) => (
            <Link key={item} color="neutral" href="#separators">
              {item}
            </Link>
          ))}
        </Breadcrumbs>

        <Typography level="h2">New application</Typography>

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
              <Input
                placeholder="example: john doe"
                {...register("inputOwnerName")}
              />
              <FormHelperText>{errors?.inputOwnerName?.message}</FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputOwnerIC}>
              <FormLabel>Owner IC:</FormLabel>
              <Input
                placeholder="example: 01234-56-78910"
                {...register("inputOwnerIC")}
              />
              <FormHelperText>{errors?.inputOwnerIC?.message}</FormHelperText>
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
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  variant="outlined"
                  color="neutral"
                  startDecorator={
                    <SvgIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                      </svg>
                    </SvgIcon>
                  }
                >
                  Upload a file
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/jpeg, image/png"
                  />
                </Button>
              </Sheet>
              <FormHelperText>{errors?.inputImage?.message}</FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputPhoneNumber}>
              <FormLabel>Owner phone number:</FormLabel>
              <Input
                placeholder="example: 013456789"
                startDecorator="+601"
                {...register("inputPhoneNumber")}
              />
              <FormHelperText>
                {errors?.inputPhoneNumber?.message}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputOwnerAddress}>
              <FormLabel>Owner mailing address:</FormLabel>
              <Input
                placeholder="example: NO7 Jalan Bunian 25200 Bunian"
                {...register("inputOwnerAddress")}
              />
              <FormHelperText>
                {errors?.inputOwnerAddress?.message}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputBusinessName}>
              <FormLabel>Business name:</FormLabel>
              <Input
                placeholder="example: Megah holding sdn bhd"
                {...register("inputBusinessName")}
              />
              <FormHelperText>
                {errors?.inputBusinessName?.message}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputBusinessSSM}>
              <FormLabel>Business SSM:</FormLabel>
              <Input
                placeholder="example: 123456789"
                {...register("inputBusinessSSM")}
              />
              <FormHelperText>
                {errors?.inputBusinessSSM?.message}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputBusinessPhoneNumber}>
              <FormLabel>Business phone number:</FormLabel>
              <Input
                placeholder="example: 013456789"
                startDecorator="+601"
                {...register("inputBusinessPhoneNumber")}
              />
              <FormHelperText>
                {errors?.inputBusinessPhoneNumber?.message}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputTyphoidInjection}>
              <FormLabel>Typhoid Injection:</FormLabel>
              <Select
                placeholder="Choose one…"
                {...register("inputTyphoidInjection")}
              >
                <Option value={"No"}>No</Option>
                <Option value={"Yes"}>Yes</Option>
              </Select>
              <FormHelperText>
                {errors?.inputTyphoidInjection?.message}
              </FormHelperText>
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
