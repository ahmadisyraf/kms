import React from "react";
import Sidebar from "@/components/Sidebar";
import { Sheet, Box } from "@mui/joy";

export default function DashboardLayout({ children }) {
  return (
    <Sheet sx={{ height: "100vh" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            width: "15%",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            display: { xs: "none", sm: "none", md: "initial", lg: "initial" },
          }}
        >
          <Sidebar />
        </Box>

        <Box
          sx={{
            marginLeft: { xs: 0, sm: 0, md: "15%", lg: "15%" },
            width: { xs: "100%", sm: "100%", md: "85%", lg: "85%" },
            overflowY: "auto",
          }}
        >
          <Sheet
            sx={{
              p: 3,
              flexGrow: 1,
              bgcolor: "background.default",
              height: "100vh",
              pb: 10,
            }}
            variant="soft"
          >
            {children}
          </Sheet>
        </Box>
      </Box>
    </Sheet>
  );
}
