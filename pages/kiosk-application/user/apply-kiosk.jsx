import DashboardLayout from "@/layouts/dashboard";
import {
  Box,
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Compressor from "compressorjs";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const CustomBreadcrumbs = dynamic(
  () => import("@/components/CustomBreadcrumbs"),
  { ssr: true, loading: () => <p>Loading...</p> }
);

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
    link: "/kiosk-application/user",
  },
  { name: "Kiosk application", link: "/kiosk-application/user" },
  {
    name: "New application",
    link: "/kiosk-application/user/apply-application",
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

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  const handleFileChange = async (event) => {
    const image = event.target.files[0];

    setFilename(image.name);

    try {
      const compressedBlob = await new Promise((resolve, reject) => {
        new Compressor(image, {
          quality: 0.8,
          mimeType: "image/jpeg",
          success(result) {
            resolve(result);
          },
          error(error) {
            reject(error);
          },
        });
      });

      setFile(compressedBlob);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();

    setIsLoading(true);
    const loadingToast = toast.loading("Saving, please wait..");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gdena9lv");

    try {
      const uploadImage = await fetch(
        "https://api.cloudinary.com/v1_1/ds7skkfym/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadImage.ok) {
        throw new Error("Image can't be upload");
      }

      const image = await uploadImage.json();

      const currentDate = new Date();

      const obj = {
        inputOwnerName: data.inputOwnerName,
        inputOwnerIC: data.inputOwnerIC,
        inputOwnerPhoneNumber: data.inputPhoneNumber,
        inputOwnerAddress: data.inputOwnerAddress,
        inputBusinessName: data.inputBusinessName,
        inputBusinessPhoneNumber: data.inputBusinessPhoneNumber,
        inputTyphoidInjection: data.inputTyphoidInjection,
        inputImage: image.secure_url,
        inputBusinessSSM: data.inputBusinessSSM,
        inputCreatedDate: currentDate,
      };

      const createApplication = await fetch(`/api/application/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (!createApplication) {
        toast.error("Something went worng!", { id: loadingToast });
      }

      const applicationData = await createApplication.json();

      if (!applicationData) {
        toast.error("Something went wrong", { id: loadingToast });
      }

      toast.success("Application saved!", { id: loadingToast });

      router.push("/kiosk-application/user/");
    } catch (error) {
      toast.error("Please check internet connection, or contact our support", {
        id: loadingToast,
      });
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ mt: 10 }}>
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />

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
                disabled={isLoading}
              />
              <FormHelperText>{errors?.inputOwnerName?.message}</FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputOwnerIC}>
              <FormLabel>Owner IC:</FormLabel>
              <Input
                placeholder="example: 01234-56-78910"
                {...register("inputOwnerIC")}
                disabled={isLoading}
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
                {file ? (
                  <AspectRatio
                    variant="outlined"
                    ratio="1"
                    objectFit="cover"
                    sx={{ width: 200, borderRadius: 15 }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="user ic"
                      loading="lazy"
                    />
                  </AspectRatio>
                ) : (
                  <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    variant="outlined"
                    color="neutral"
                    disabled={isLoading}
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
                      onChange={handleFileChange}
                    />
                  </Button>
                )}
              </Sheet>
              <FormHelperText>{errors?.inputImage?.message}</FormHelperText>
              <Typography>{filename}</Typography>
            </FormControl>
            <FormControl error={errors?.inputPhoneNumber}>
              <FormLabel>Owner phone number:</FormLabel>
              <Input
                placeholder="example: 013456789"
                startDecorator="+60"
                {...register("inputPhoneNumber")}
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <FormHelperText>
                {errors?.inputBusinessSSM?.message}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputBusinessPhoneNumber}>
              <FormLabel>Business phone number:</FormLabel>
              <Input
                placeholder="example: 013456789"
                startDecorator="+60"
                {...register("inputBusinessPhoneNumber")}
                disabled={isLoading}
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
                disabled={isLoading}
              >
                <Option value={false}>No</Option>
                <Option value={true}>Yes</Option>
              </Select>
              <FormHelperText>
                {errors?.inputTyphoidInjection?.message}
              </FormHelperText>
            </FormControl>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Stack>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
