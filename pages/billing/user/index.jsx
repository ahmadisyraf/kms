import { useEffect } from "react";
import { useRouter } from "next/router";

export default function UserKioskApplicationPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/billing/user/view-billing");
  }, [router]);

  return null;
}
