"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { useSupabase } from "./useSupabase";

/**
 * Suit la session Supabase courante côté client.
 * `undefined` pendant le chargement initial, puis `Session | null`.
 * Utilisé pour n'afficher le lien Admin qu'aux utilisateurs connectés.
 */
export function useSupabaseSession(): Session | null | undefined {
  const supabase = useSupabase();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return session;
}
