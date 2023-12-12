import { SignUp } from "@clerk/nextjs";
import { Box } from "@mui/joy";

export default function SignUpPages() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 800,
        fontFamily: "sans-serif",
      }}
    >
      <SignUp />
    </Box>
  );
}
