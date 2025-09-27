export const dynamic = "force-dynamic";
export const revalidate = 0;

import HistoryClient from "./HistoryClient";

export default async function HistoryPage() {
  return <HistoryClient />;
}
