import * as React from "react";
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
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import MoreVert from "@mui/icons-material/MoreVert";
import DashboardLayout from "@/layouts/dashboard";
export default function CreatePromotion() {
  const handleChange = (event, newValue) => {
    console.log(`You have choosen "${newValue}"`);
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
  return (
    <DashboardLayout>
      <Box>
        <Typography level="h1" color="secondary" fontSize={35} sx={{ mt: 15 }}>
          Add Complaint
        </Typography>
        <Box>
          <Card sx={{ mt: 2 }}>
              <FormLabel sx={{ my: 1 }}>Complaint type :</FormLabel>
              <Select
                placeholder="Select a type"
                indicator={<KeyboardArrowDown />}
                sx={{
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                <Option value="cleanliness">Cleanliness</Option>
                <Option value="fooddrink">Food&Drink</Option>
                <Option value="fish">Facility</Option>
                <Option value="other">Other</Option>
              </Select>
              <FormLabel sx={{ my: 1 }}>Kiosk Number :</FormLabel>
              <Select
                placeholder="Pick your kiosk number"
                indicator={<KeyboardArrowDown />}
                sx={{
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                <Option value="Kiosk 1">Kiosk 1</Option>
                <Option value="Kiosk 2">Kiosk 2</Option>
                <Option value="Kiosk 3">Kiosk 3</Option>
                <Option value="Kiosk 4">Kiosk 4</Option>
                <Option value="Kiosk 5">Kiosk 5</Option>
                <Option value="Kiosk 6">Kiosk 6</Option>
                <Option value="Kiosk 7">Kiosk 7</Option>
                <Option value="Kiosk 8">Kiosk 8</Option>
                <Option value="Kiosk 9">Kiosk 9</Option>
                <Option value="Kiosk 10">Kiosk 10</Option>
                <Option value="Kiosk 11">Kiosk 11</Option>
                <Option value="Kiosk 12">Kiosk 12</Option>
                <Option value="Kiosk 13">Kiosk 13</Option>
                <Option value="Kiosk 14">Kiosk 14</Option>
                <Option value="Kiosk 15">Kiosk 15</Option>
                <Option value="Kiosk 16">Kiosk 16</Option>
              </Select>
              <FormLabel sx={{ my: 1 }}>Description :</FormLabel>
              <Textarea
                size="lg"
                name="Size"
                placeholder="One of the drawer cannot be used."
              />
              <Button>Submit</Button>
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
