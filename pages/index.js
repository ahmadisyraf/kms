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
import { useAuth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const { isSignedIn } = useAuth();
  const [promotion, setPromotion] = useState([]);
  const [checked, setChecked] = useState(false);

  console.log(promotion, "ini bill");

  const fetchPromotion = async () => {
    try {
      const dbData = await fetch("/api/mainpage", {
        method: "GET",
      });

      if (!dbData.ok) {
        toast.error("Something went wrong! Please contact our support.");
      }

      const data = await dbData.json();
      console.log(data, "..promo");
      setPromotion(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchPromotion();
    }
  }, [isSignedIn]);

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
                  width={70}
                  height={50}
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
        <Grid container spacing={1} md={{ flexGrow: 1 }}>
          {promotion.map((d, index) => (
            <Grid lg={3}>
              <Card
                sx={{ width: 320, maxWidth: "100%", boxShadow: "lg", mt: 5 }}
                key={index}
              >
                <CardOverflow>
                  <AspectRatio sx={{ minWidth: 200 }}>
                    <img src="https://img.freepik.com/free-vector/americano-cappuccino-coffee-poster-discount-template-modern-watercolor-illustration_83728-540.jpg?size=626&ext=jpg&ga=GA1.1.2121922902.1704953295&semt=ais" />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography level="body-xs"></Typography>
                  <Link
                    href="#product-card"
                    fontWeight="md"
                    color="neutral"
                    textColor="text.primary"
                    overlay
                  >
                    {d.productName}
                  </Link>

                  <Typography
                    level="title-lg"
                    sx={{ mt: 1, fontWeight: "xl" }}
                    endDecorator={
                      <Chip
                        component="span"
                        size="sm"
                        variant="soft"
                        color="success"
                      >
                        {d.product}
                      </Chip>
                    }
                  >
                    {d.title}
                  </Typography>
                  <Typography level="body-sm">
                  ( Promotion until {new Date(d.endDate).toLocaleDateString("en-GB")}
 )
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
