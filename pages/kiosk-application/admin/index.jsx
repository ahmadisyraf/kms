import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminKioskApplicationPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/kiosk-application/admin/view-application/");
  }, []);

  return null;
}
