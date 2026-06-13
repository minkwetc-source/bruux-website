import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/defile/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/defile/admin/logout — efface le cookie de session admin. */
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
