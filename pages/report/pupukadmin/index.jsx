import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PupukAdminKioskReportPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/report/pupukadmin/view-kiosk-report/");
  }, [router]); 

  return null;
}
