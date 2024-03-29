import {
  Sheet,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
  Divider,
} from "@mui/joy";
import Link from "next/link";
import { FaShop } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { useRouter } from "next/router";
import { BiSolidDiscount } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { useEffect, useState } from "react";
import { currentUser, useAuth } from "@clerk/nextjs";
import { MdAssignment } from "react-icons/md";

const navigations = [
  {
    name: "Kiosk application",
    icon: <FaShop size={18} />,
    url: "/kiosk-application/user/view-application",
  },
  {
    name: "Billing",
    icon: <MdPayments size={18} />,
    url: "/billing/user",
  },
  {
    name: "Promotion",
    icon: <BiSolidDiscount size={18} />,
    url: "/promotion/user/view-promotion",
  },
  {
    name: "Complaint",
    icon: <TbReport size={18} />,
    url: "/complaint/user/view-complaint",
  },
];

const protectedNavigation = [
  {
    name: "Kiosk application",
    icon: <FaShop size={18} />,
    url: "/kiosk-application/admin/view-application",

    name: "Kiosk Sales Report",
    icon: <TbReport size={18} />,
    url: "/report/pupukadmin",
  },
  {
    name: "Complaint",
    icon: <TbReport size={18} />,
    url: "/complaint/admin/view-complaint",
  },
  {
    name: "Billing",
    icon: <MdPayments size={18} />,
    url: "/billing/admin",
  },
  {
    name: "Work Order",
    icon: <MdAssignment size={18} />,
    url: "/work-order",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const currentUser = await fetch("/api/user/", {
      method: "GET",
    });

    if (!currentUser) {
      throw new Error("Something went wrong");
    }

    const getCurrent = await currentUser.json();

    setUser(getCurrent.user);
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUser();
    }
  }, [isSignedIn]);

  console.log(user, "..sidebar");

  return (
    <Sheet
      sx={{
        height: "100%",
        width: "100%",
        position: "sticky",
        top: 0,
        color: "black",
        py: 10,
        px: 1,
      }}
      variant="outlined"
    >
      <Typography level="body-xs" color="neutral" textTransform={"uppercase"}>
        Dashboard
      </Typography>
      <List size="md" sx={{ mt: 2 }}>
        <Stack direction={"column"} spacing={1}>
          {navigations.map((nav, index) => (
            <Link href={nav.url} key={index}>
              <ListItem>
                <ListItemButton
                  variant="plain"
                  color="primary"
                  selected={router.pathname === nav.url}
                  sx={{ borderRadius: 10, py: 1 }}
                >
                  <ListItemDecorator>{nav.icon}</ListItemDecorator>
                  <ListItemContent>{nav.name}</ListItemContent>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <Divider />
        </Stack>
      </List>
      {user?.role === "admin" ? (
        <>
          <Typography
            level="body-xs"
            color="neutral"
            textTransform={"uppercase"}
            mt={2}
          >
            ADMIN PANEL
          </Typography>
          <List size="md" sx={{ mt: 2 }}>
            <Stack direction={"column"} spacing={1}>
              {protectedNavigation.map((nav, index) => (
                <Link href={nav.url} key={index}>
                  <ListItem>
                    <ListItemButton
                      variant="plain"
                      color="primary"
                      selected={router.pathname === nav.url}
                      sx={{ borderRadius: 10, py: 1 }}
                    >
                      <ListItemDecorator>{nav.icon}</ListItemDecorator>
                      <ListItemContent>{nav.name}</ListItemContent>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </Stack>
          </List>{" "}
        </>
      ) : null}
    </Sheet>
  );
}
