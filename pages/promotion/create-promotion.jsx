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
    <Box>
      <Typography
        level="h1"
        color="primary"
        fontSize={35}
        sx={{ mt: 15, mx: 50 }}
      >
        Create Promotion
      </Typography>
      <Box>
        <Card sx={{ mt: 2, mx: 10, mx: 50 }}>
          <FormControl>
            <FormLabel sx={{ my: 1 }}>Promotion Title :</FormLabel>
            <Input sx={{ my: 1, width: "30%" }} placeholder="Buy 1 Free 1" />
            <FormLabel sx={{ my: 1 }}>Description :</FormLabel>
            <Textarea
              size="lg"
              name="Size"
              placeholder="Do not miss your chance"
              sx={{ width: "30%" }}
            />
            <FormLabel sx={{ my: 1 }}>Date :</FormLabel>
            <Input sx={{width: "30%" }} type="date" />
            <FormLabel sx={{ my: 1 }}>Start time :</FormLabel>
            <Input
              placeholder="14:00 PM"
              sx={{ textAlign: "center", width: "30%" }} // Adjust the width as needed
            />
            <FormLabel sx={{ my: 1 }}>Promotion product :</FormLabel>
            <Select
              sx={{width: "30%" }}
              multiple
              defaultValue={["dog", "cat"]}
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
            </Select>
          </FormControl>
          <FormLabel>Upload your promotion poster :</FormLabel>
          <Button sx={{width:"20%"}}
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
          </Button>
        </Card>
      </Box>
    </Box>
  );
}
