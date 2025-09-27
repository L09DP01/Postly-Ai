export const dynamic = "force-dynamic";
export const revalidate = 0;

import BillingClient from "./BillingClient";

export default async function BillingPage() {
  return <BillingClient />;
}