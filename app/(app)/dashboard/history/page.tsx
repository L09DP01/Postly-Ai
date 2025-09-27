export const dynamic = &quot;force-dynamic&quot;;
export const revalidate = 0;

import { getServerSession } from &quot;next-auth&quot;;
import { authOptions } from &quot;@/lib/auth&quot;;
import { redirect } from &quot;next/navigation&quot;;
import HistoryClient from "./HistoryClient";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login?callbackUrl=/dashboard/history");

  return <HistoryClient />;
}
