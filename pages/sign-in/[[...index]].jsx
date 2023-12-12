import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Box, Skeleton } from "@mui/joy";

export default function SignInPages() {
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
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
      <ClerkLoading>
        <Skeleton variant="rectangular" width={400} height={450} />
      </ClerkLoading>
    </Box>
  );
}
