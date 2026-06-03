import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  // Honeypot rempli → bot : on simule un succès sans rien traiter.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // TODO: brancher un transport email (ex. Resend) vers grandjeu@renarddessurfaces.com.
  console.log("[lead]", {
    company: parsed.data.company,
    email: parsed.data.email,
    budget: parsed.data.budget || "—",
  });

  return NextResponse.json({ ok: true });
}
