import { NextResponse } from "next/server";
import {
  verifyAdminPassword,
  createSessionToken,
  COOKIE_NAME,
  cookieMaxAgeSeconds,
} from "@/lib/defile/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/defile/admin/login
 * Vérifie le mot de passe partagé et pose un cookie de session httpOnly signé.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide." }, { status: 400 });
  }

  const password = (body as { password?: unknown })?.password;

  if (!verifyAdminPassword(password)) {
    return NextResponse.json(
      { error: "Mot de passe incorrect." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: cookieMaxAgeSeconds,
  });
  return response;
}
