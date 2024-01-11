import * as React from "react";
import Button from "@mui/joy/Button";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  Typography,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Textarea,
  Card,
  Table,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Switch,
  Select,
  Option,
  Chip,
  Stack,
  SvgIcon,
  styled,
  selectClasses,
} from "@mui/joy";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import MoreVert from "@mui/icons-material/MoreVert";
import DashboardLayout from "@/layouts/dashboard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

const breadcrumbs = [
  {
    name: "Dashboard",
    link: "/complaint/user",
  },
  { name: "Kiosk Complaint", link: "/complaint/user" },
  {
    name: "New Complaint",
    link: "/complaint/user/create-complaint",
  },
];

const schema = yup
  .object({
    inputType: yup.string().required("Type is required field"),
    inputComment: yup.string().required("Comment is required field"),
    // inputPoster: yup.string().required("Poster is required field"),
  })
  .required();

export default function CreateComplaint() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router=useRouter()

  const { userId, isSignedIn } = useAuth();

  const [applicationId, setApplicationId] = useState();

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
      toast.success("Complaint saved");

      setApplicationId(application[0].id);
    } catch (err) {
      toast.error("Something wrong, please contact our support");
    }
  };

  const onSubmit = async (data) => {
    const obj = {
      inputType: data.inputType,
      inputComment: data.inputComment,
    };

    try {
      const postComplaint = await fetch(`/api/complaint/${applicationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (!postComplaint.ok) {
        toast.error("Something wrong, please contact support");
      } else if (postComplaint.ok) {
        const complaint = await postComplaint.json();
        console.log(complaint);
        toast.success("Complaint saved");

        router.push('/complaint/user/list-complaint'); // Change '/list-complaint' to the actual URL of your list-complaint page
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchApplicationId();
    }
  }, [isSignedIn]);

  console.log(applicationId, "..tada");

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
  return (
    <DashboardLayout>
      <Box>
        <Typography level="h1" color="secondary" fontSize={35} sx={{ mt: 15 }}>
          Create Complaint
        </Typography>
        <Box>
          <Card sx={{ mt: 2 }} component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
              <FormLabel sx={{ my: 1 }}>Complaint type :</FormLabel>
              <Input
                value="Facility"
              />
              <FormHelperText>
              </FormHelperText>
            </FormControl>
            <FormControl error={errors?.inputComment}>
              <FormLabel sx={{ my: 1 }}>Comment :</FormLabel>
              <Textarea
                name="Size"
                value="Do not miss your chance"
                {...register("inputComment")}
                minRows={4}
              />
              <FormHelperText>{errors?.inputComment?.message}</FormHelperText>
            </FormControl>
            <Button type="submit">Back</Button>
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
