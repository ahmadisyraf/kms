import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  Link,
} from "@mui/joy";
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
import Image from "next/image";

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
                <Image
                  src={"/petakom.gif"}
                  width={100}
                  height={60}
                  alt="petakom"
                />

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
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography level="h1" color="black" fontSize={35} sx={{ mr: 1 }}>
            Petakom Kiosk
            <Typography
              level="h1"
              color="primary"
              fontSize={35}
              sx={{ ml: 1.2 }}
            >
              Hot Promotion
            </Typography>
          </Typography>
        </Box>
        <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg", mt: 5 }}>
          <CardOverflow>
            <AspectRatio sx={{ minWidth: 200 }}>
              <img
                src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="body-xs">Kiosk 14</Typography>
            <Link
              href="#product-card"
              fontWeight="md"
              color="neutral"
              textColor="text.primary"
              overlay
            >
              Caramel Machiato
            </Link>

            <Typography
              level="title-lg"
              sx={{ mt: 1, fontWeight: "xl" }}
              endDecorator={
                <Chip component="span" size="sm" variant="soft" color="success">
                  Buy 1 Free 1
                </Chip>
              }
            >
              RM 8.99
            </Typography>
            <Typography level="body-sm">
              (Only <b>3</b> days left!)
            </Typography>
          </CardContent>
          <CardOverflow>
            <Button variant="solid" color="primary" size="lg">
              See Promotion
            </Button>
          </CardOverflow>
        </Card>
      </Box>
    </>
  );
}
