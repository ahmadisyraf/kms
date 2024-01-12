import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PupukAdminKioskReportPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/report/pupukadmin/kiosk-report/");
  }, [router]); 

  return null;
}
