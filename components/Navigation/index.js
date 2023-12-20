import { Box, Typography, Button, Sheet } from "@mui/joy";
import { UserButton, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";

export default function Navigation() {
  const { isSignedIn } = useAuth();

  const fetchUser = async () => {
    const currentUser = await fetch("/api/user/", {
      method: "GET",
    });

    if (!currentUser) {
      throw new Error("Something went wrong");
    }

    const getCurrent = await currentUser.json();

    console.log(getCurrent, "...user data");
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUser();
    }
  }, [isSignedIn]);

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
