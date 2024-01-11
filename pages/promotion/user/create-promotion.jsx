import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Button from "@mui/joy/Button";
import {
  Typography,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Textarea,
  Card,
  Select,
  Option,
  Chip,
  SvgIcon,
  styled,
} from "@mui/joy";
import DashboardLayout from "@/layouts/dashboard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

const breadcrumbs = [
  {
    name: "Dashboard",
    link: "/promotion/user",
  },
  { name: "Kiosk promotion", link: "/promotion/user" },
  {
    name: "New Promotion",
    link: "/promotion/user/create-promotion",
  },
];

const schema = yup
  .object({
    inputPromotionTitle: yup
      .string()
      .required("Promotion title is required field"),
    inputDescription: yup.string().required("Description is required field"),
    inputStartDate: yup.string().required("Start date is required field"),
    inputEndDate: yup.string().required("End date is required field"),
    inputStartTime: yup.string().required("Start time is required field"),
    inputProductName: yup.string().required("Product name is required field"),
    inputProductCategory: yup
      .string()
      .required("Product category is required field"),
    // inputPoster: yup.string().required("Poster is required field"),
  })
  .required();

export default function CreatePromotion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router=useRouter()
  // Clerk user id
  const { userId, isSignedIn } = useAuth();

  const [applicationId, setApplicationId] = useState();

  const onSubmit = async (data) => {
    const obj = {
      inputPromotionTitle: data.inputPromotionTitle,
      inputDescription: data.inputDescription,
      inputStartDate: data.inputStartDate,
      inputEndDate: data.inputEndDate,
      inputStartTime: data.inputStartTime,
      inputProductName: data.inputProductName,
      inputProductCategory: data.inputProductCategory,
    };

    const postPromotion = await fetch(`/api/promotion/${applicationId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!postPromotion.ok) {
      toast.error("Something wrong, please contact support");
    } else {
      const promotion = await postPromotion.json();

      if(promotion)
      toast.success("Promotion saved");

      router.push('/promotion/user/view-promotion'); // Change '/list-complaint' to the actual URL of your list-complaint page
      
    
    }
  };

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

  // Get application id from clerk user id
  const fetchApplicationId = async () => {
    try {
      // Get approve application
      const getApplication = await fetch(
        "/api/application?filter=true&status=approve",
        {
          method: "GET",

          
        }
        
      );

      if (!getApplication.ok) {
        toast.error("Something wrong please contact our support");
      }

      const application = await getApplication.json();
      toast.success("Promotion saved");
      
      setApplicationId(application[0].id);
      } catch (err) {
      toast.error("Something wrong, please contact our support");
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchApplicationId();
    }
  }, [isSignedIn]);

  console.log(applicationId, "..tada");

  return (
    <DashboardLayout>
      <Box sx={{ mb: 20 }}>
        <Typography level="h1" color="primary" fontSize={35} sx={{ mt: 10 }}>
          Create Promotion
        </Typography>
        <Box sx={{ mb: 20 }}>
          <Card
            sx={{ mb: 10 }}
            variant="outlined"
            color="neutral"
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl error={errors?.inputPromotionTitle}>
              <FormLabel sx={{ my: 1 }}>Promotion Title :</FormLabel>
              <Input
                placeholder="Buy 1 Free 1"
                {...register("inputPromotionTitle")}
              />
              <FormHelperText>
                {errors?.inputPromotionTitle?.message}
              </FormHelperText>
            </FormControl>

            <FormControl error={errors?.inputDescription}>
              <FormLabel sx={{ my: 1 }}>Description :</FormLabel>
              <Textarea
                name="Size"
                placeholder="Do not miss your chance"
                {...register("inputDescription")}
                minRows={4}
              />
              <FormHelperText>
                {errors?.inputDescription?.message}
              </FormHelperText>
            </FormControl>

            <FormControl error={errors?.inputStartDate}>
              <FormLabel sx={{ my: 1 }}>Start Date :</FormLabel>
              <Input type="date" {...register("inputStartDate")} />

              <FormHelperText>{errors?.inputStartDate?.message}</FormHelperText>
            </FormControl>

            <FormControl error={errors?.inputEndDate}>
              <FormLabel sx={{ my: 1 }}>End Date :</FormLabel>
              <Input type="date" {...register("inputEndDate")} />

              <FormHelperText>{errors?.inputEndDate?.message}</FormHelperText>
            </FormControl>

            <FormControl error={errors?.inputStartTime}>
              <FormLabel sx={{ my: 1 }}>Start time :</FormLabel>

              <Input
                placeholder="00:00 PM"
                sx={{ textAlign: "center" }}
                {...register("inputStartTime")} // Adjust the width as needed
              />
              <FormHelperText>{errors?.inputStartTime?.message}</FormHelperText>
            </FormControl>

            <FormControl error={errors?.inputProductName}>
              <FormLabel sx={{ my: 1 }}>Promotion name :</FormLabel>
              <Input
                sx={{ my: 1 }}
                placeholder="Mocha"
                {...register("inputProductName")}
              />
              <FormHelperText>
                {errors?.inputProductName?.message}
              </FormHelperText>
            </FormControl>

            <FormControl error={errors?.inputProductCategory}>
              <FormLabel sx={{ my: 1 }}>Product categories :</FormLabel>
              <Input
                sx={{ my: 1 }}
                placeholder="Beverages(coffee)"
                {...register("inputProductCategory")}
              />
              <FormHelperText>
                {errors?.inputProductCategory?.message}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Upload your promotion poster :</FormLabel>

              <Button
                sx={{ width: "20%" }}
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
                <VisuallyHiddenInput type="file" />
                <FormHelperText></FormHelperText>
              </Button>
            </FormControl>
            <Button type="submit">Submit</Button>
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
