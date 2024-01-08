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
import { MoreVert, Add, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";

export default function CreatePromotion() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Box>
      <Typography
        level="h1"
        color="primary"
        fontSize={35}
        sx={{ mt: 15, mx: 5 }}
      >
        Create Promotion
      </Typography>
      <Card size="lg" sx={{ ml: 5, mr: 5, mt: 2 }}>
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th style={{ width: "3%" }}></th>
              <th>Promotion Title</th>
              <th>Start date</th>
              <th>Status</th>
              <th>Product name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Switch
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  color={checked ? "success" : "neutral"}
                  variant={checked ? "solid" : "outlined"}
                  slotProps={{
                    endDecorator: {
                      sx: {
                        minWidth: 24,
                      },
                    },
                  }}
                />
              </td>
              <td>Buy 1 Free 1</td>
              <td>20 Jan 2022</td>
              <td>On</td>
              <td>Any coffee (Small Size)</td>
              <td>
                <Dropdown>
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
                </Dropdown>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
      <Link href="/promotion/create-promotion">
        <Button sx={{ ml: 188.5, mt: 1.5 }} startDecorator={<Add />}>
          New Promotion
        </Button>
      </Link>
    </Box>
  );
}
