import {
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Edge middleware — protège uniquement /admin/* (sauf /admin lui-même qui
 * est la page de login). Si l'utilisateur n'a pas de session Supabase, on
 * redirige vers /admin avec ?redirect=<original-path>.
 *
 * Le helper Supabase est inliné ici (pas d'import via @/*) pour rester
 * 100% compatible Edge Runtime — Vercel bundle ce fichier séparément
 * et n'exécute pas les path aliases sur tous les types d'imports.
 *
 * La vérification "est-ce un admin allowlisté" se fait dans le layout authed
 * (table admin_users) — middleware = simple barrière session.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si les env vars manquent (preview deploys, etc.), on laisse passer —
  // les Server Components admin redirigeront via requireAdmin() de toute façon.
  if (!url || !anonKey) {
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: Array<{
          name: string;
          value: string;
          options: CookieOptions;
        }>,
      ) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin";

  if (!isLoginRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

/**
 * Le matcher limite l'exécution du middleware à /admin/*. Toutes les autres
 * routes (homepage, /evenements, /blog, /galerie, /famille, /contact, assets)
 * sont servies sans passer par l'Edge — pas de coût ni de latence ajoutée.
 */
export const config = {
  matcher: ["/admin/:path*"],
};
