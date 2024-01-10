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
} from "@mui/joy";
import DashboardLayout from "@/layouts/dashboard";

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

export default function CreatePromotion() {
  ;

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
      <Box sx={{mb:20}}>
        <Typography level="h1" color="primary" fontSize={35} sx={{ mt: 10 }}>
          Create Promotion
        </Typography>
        <Box sx={{mb:20}}>
          <Card
            sx={{ mb:10 }}
            variant="outlined"
            color="neutral"
            component={"form"}
          >
            <FormControl>
              <FormLabel sx={{ my: 1 }}>Promotion Title :</FormLabel>
              <Input
                sx={{ my: 1 }}
                placeholder="Buy 1 Free 1"
              />
              <FormHelperText>
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ my: 1 }}>Description :</FormLabel>
              <Textarea
                size="lg"
                name="Size"
                placeholder="Do not miss your chance"
              />
              <FormHelperText>
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ my: 1 }}>Date :</FormLabel>
              <Input type="date"/>
              
              <FormHelperText>
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ my: 1 }}>Start time :</FormLabel>

              <Input
                placeholder="14:00 PM"
                sx={{ textAlign: "center" }} // Adjust the width as needed
              />
              <FormHelperText>

              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ my: 1 }}>Promotion product :</FormLabel>
              <Select
                multiple
                defaultValue={["coffee", "waffle"]}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", gap: "0.25rem" }}>
                    {selected.map((selectedOption) => (
                      <Chip variant="soft" color="primary">
                        {selectedOption.label}
                      </Chip>
                    ))}
                  </Box>
                )}
                slotProps={{
                  listbox: {
                    sx: {
                      width: "100%",
                    },
                  },
                }}
              >
                <Option value="Coffee">Coffee</Option>
                <Option value="Waffle">Waffle</Option>
                <Option value="Other">Other</Option>
              </Select>
              <FormHelperText>
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
              <FormHelperText>
               
              </FormHelperText>
            </Button>
            </FormControl>
            <Button type="submit">Submit</Button>
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
