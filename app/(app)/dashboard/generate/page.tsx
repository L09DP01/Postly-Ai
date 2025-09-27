export const dynamic = "force-dynamic";
export const revalidate = 0;

import GenerateClient from "./GenerateClient";

export default async function GeneratePage() {
  return <GenerateClient />;
}
