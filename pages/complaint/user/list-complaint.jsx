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
} from "@mui/joy";
import DashboardLayout from "@/layouts/dashboard";
import { MoreVert, Add, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";

export default function CreatePromotion() {
  const [checked, setChecked] = React.useState(false);
  return (
    <DashboardLayout>
      <Box>
        <Typography
          level="h1"
          color="secondary"
          fontSize={35}
          sx={{ mt: 15}}
        >
          Kiosk Complaint
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Link href="/complaint/user/create-complaint">
            <Button sx={{ ml: 150, mt: 1.5 }} startDecorator={<Add />}>
              New Complaint
            </Button>
          </Link>
        </Box>
        <Card size="lg" sx={{ mt: 2 }}>
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Complaint Type</th>
                <th>Kiosk</th>
                <th>Comment</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>WXT1910</td>
                <td>Cermin rosak</td>
                <td>14</td>
                <td>Tolong datang cepat</td>
                <td>Pending</td>
                <td><Dropdown>
                    <MenuButton
                      slots={{ root: IconButton }}
                      slotProps={{
                        root: { variant: "outlined", color: "neutral" },
                      }}
                    >
                      <MoreVert />
                    </MenuButton>
                    <Menu>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>View</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </Menu>
                  </Dropdown></td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
