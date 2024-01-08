import * as React from "react";
import {
  Typography,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Textarea,
} from "@mui/joy";

export default function CreatePromotion() {
  return (
    <Box>
      <Typography
        level="h1"
        color="primary"
        fontSize={35}
        sx={{ mt: 15, mx: 10 }}
      >
        Create Promotion
      </Typography>
      <Box sx={{ ml: 90, mt: 5 }}>
        <FormControl>
          <FormLabel sx={{ my: 1 }}>Promotion Title :</FormLabel>
          <Input
            placeholder="Buy 1 Free 1"
            sx={{ textAlign: "center", width: "20%" }} // Adjust the width as needed
          />
          <FormLabel sx={{ my: 1 }}>Description :</FormLabel>
          <Textarea
            size="lg"
            name="Size"
            placeholder="Large"
            sx={{ width: "30%" }}
          />
        </FormControl>
      </Box>
    </Box>
  );
}
