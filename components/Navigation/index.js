import { Box, Typography, Button, Sheet } from "@mui/joy";
import { UserButton, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";

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
      sx={{ position: "fixed", width: "100%", zIndex: 1000, top: 0 }}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Button
            variant="outlined"
            color="neutral"
            sx={{ mr: 1, width: 40, px: 0 }}
          >
            <IoMenu size={23} />
          </Button> */}
            <Image src={"/logo.svg"} width={40} height={40} />

            <Typography level="h4" ml={1} mt={0.5}>
              KioskMS
            </Typography>
          </Box>
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
