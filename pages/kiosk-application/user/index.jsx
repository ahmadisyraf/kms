import { useEffect } from "react";
import { useRouter } from "next/router";

export default function UserKioskApplicationPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/kiosk-application/user/view-application/");
  }, []);

  return null;
}
