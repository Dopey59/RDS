import { InvitePage } from "@/components/invite/InvitePage";

export const dynamic = "force-static";

export default async function GroupPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <InvitePage variant="group" code={code} />;
}
