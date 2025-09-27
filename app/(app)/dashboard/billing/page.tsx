export const dynamic = &quot;force-dynamic&quot;;
export const revalidate = 0;

import { getServerSession } from &quot;next-auth&quot;;
import { authOptions } from &quot;@/lib/auth&quot;;
import { redirect } from &quot;next/navigation&quot;;
import BillingClient from "./BillingClient";

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login?callbackUrl=/dashboard/billing");

  return <BillingClient />;
}