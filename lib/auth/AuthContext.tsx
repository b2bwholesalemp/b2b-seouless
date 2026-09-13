import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabase';
import { validateEnv } from '../env';
import { UserProfile, UserRole } from '../../types';

/**
 * Supabase-ready auth context.
 *
 * When real Supabase credentials are present (i.e. the URL is not the
 * placeholder fallback) the context wires into Supabase session management.
 * Otherwise it falls back to a mock session so the app remains fully
 * functional during development.
 */

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  isSupabaseEnabled: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, companyName: string, role?: UserRole) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function isSupabaseConfigured(): boolean {
  const env = validateEnv();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!url && !url.includes('placeholder') && !!key && !key.includes('placeholder');
}

export const AuthProvider: React.FC<{ children: React.ReactNode; fallbackUser?: UserProfile }> = ({
  children,
  fallbackUser,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabaseEnabled = isSupabaseConfigured();

  // ---- Supabase session bootstrap ----
  useEffect(() => {
    if (!supabaseEnabled) {
      // Mock mode — use the fallback user so the app is immediately usable.
      setUser(fallbackUser ?? null);
      setLoading(false);
      return;
    }

    // Real Supabase mode.
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email ?? '',
          role: (data.session.user.user_metadata?.role as UserRole) ?? 'brand_admin',
          companyName: data.session.user.user_metadata?.companyName ?? 'Unknown',
          createdAt: data.session.user.created_at ?? new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          role: (session.user.user_metadata?.role as UserRole) ?? 'brand_admin',
          companyName: session.user.user_metadata?.companyName ?? 'Unknown',
          createdAt: session.user.created_at ?? new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabaseEnabled, fallbackUser]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error: string | null }> => {
      if (!supabaseEnabled) {
        // Mock sign-in: accept any credentials.
        setUser(fallbackUser ?? null);
        return { error: null };
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      return { error: null };
    },
    [supabaseEnabled, fallbackUser]
  );

  const signUp = useCallback(
    async (email: string, password: string, companyName: string, role: UserRole = 'brand_admin'): Promise<{ error: string | null }> => {
      if (!supabaseEnabled) {
        setUser({
          id: `usr_${Date.now()}`,
          email,
          role,
          companyName,
          createdAt: new Date().toISOString(),
        });
        return { error: null };
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { companyName, role } },
      });
      if (error) return { error: error.message };
      return { error: null };
    },
    [supabaseEnabled]
  );

  const signOut = useCallback(async () => {
    if (!supabaseEnabled) {
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  }, [supabaseEnabled]);

  return (
    <AuthContext.Provider value={{ user, loading, isSupabaseEnabled: supabaseEnabled, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

/**
 * Supabase-ready persistence helpers.
 * When Supabase is configured, these call the real table; otherwise they
 * return local mock data so the UI stays functional.
 */
export async function persistEntity<T>(
  table: string,
  payload: T,
  useSupabase: boolean
): Promise<{ error: string | null }> {
  if (!useSupabase) return { error: null };
  const { error } = await supabase.from(table).insert(payload);
  return { error: error?.message ?? null };
}

export async function fetchEntities<T>(
  table: string,
  useSupabase: boolean
): Promise<{ data: T[] | null; error: string | null }> {
  if (!useSupabase) return { data: null, error: null };
  const { data, error } = await supabase.from(table).select('*');
  return { data: data as T[] | null, error: error?.message ?? null };
}
