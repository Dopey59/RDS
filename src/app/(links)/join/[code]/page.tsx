import { InvitePage } from "@/components/invite/InvitePage";

export const dynamic = "force-static";

export default async function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <InvitePage variant="join" code={code} />;
}
