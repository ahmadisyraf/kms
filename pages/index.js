import { Box, Button, Grid, Stack, Typography } from "@mui/joy";
import Lottie from "lottie-react";
import animation from "../public/landing-page.json";

export default function Home() {
  return (
    <>
      <Box py={10} px={20}>
        {/* <Box textAlign={"center"} py={15}>
          <Stack direction={"column"} spacing={1}>
            <Typography level="h1" color="primary">
              Make kiosk registration easy and fast with us
            </Typography>
            <Typography>
              Experience seamless and swift kiosk registration with our
              cutting-edge system.
            </Typography>
            <Box pt={3}>
              <Button variant="solid">Get Started</Button>
            </Box>
          </Stack>
        </Box> */}
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"row"}
        >
          <Grid md={6}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={1}>
                <Typography level="h1" color="primary" fontSize={55}>
                  Make kiosk registration easy, fast and secure with us.
                </Typography>
                <Typography level="body-lg">
                  Experience seamless and swift kiosk registration with our
                  cutting-edge system.
                </Typography>
                <Box pt={3}>
                  <Button variant="solid" size="lg">
                    Get Started
                  </Button>
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
