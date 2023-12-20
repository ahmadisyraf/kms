import { Box, Button, Grid, Stack, Typography } from "@mui/joy";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import dynamic from "next/dynamic";

const Lottie = dynamic(
  () => import("lottie-react").then((module) => module.default),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
import animation from "../public/landing-page.json";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Box
        py={{ xs: 15, sm: 15, md: 10, lg: 10 }}
        px={{ xs: 5, md: 10, lg: 20 }}
      >
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"row"}
          spacing={5}
        >
          <Grid md={6}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Stack
                direction={"column"}
                spacing={1}
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "left",
                  lg: "left",
                }}
              >
                <Typography
                  level="h1"
                  color="primary"
                  fontSize={{ xs: 50, sm: 50, md: 55, lg: 55 }}
                >
                  Make kiosk registration easy, fast and secure with us.
                </Typography>
                <Typography level="body-lg">
                  Experience seamless and swift kiosk registration with our
                  cutting-edge system.
                </Typography>
                <Box pt={3}>
                  <Link href={"/kiosk-application/user/view-application"}>
                    <Button variant="solid" size="lg">
                      Go to dashboard
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Lottie animationData={animation} loop={true} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
