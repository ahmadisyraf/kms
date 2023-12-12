import { Box, Typography, Button, Sheet } from "@mui/joy";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Navigation() {
  return (
    <Sheet
      variant="outlined"
      color="neutral"
      sx={{ position: "fixed", width: "100%", zIndex: 1000 }}
    >
      <Box
        py={2}
        px={2}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link href={"/"}>
          <Typography level="h4">KioskMS</Typography>
        </Link>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href={"/sign-in"}>
            <Button variant="outlined">Login</Button>
          </Link>
        </SignedOut>
      </Box>
    </Sheet>
  );
}
