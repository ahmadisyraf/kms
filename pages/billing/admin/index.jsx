import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminVBillingPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/billing/admin/view-billing");
  }, [router]);

  return null;
}
