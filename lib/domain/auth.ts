import { isDemoMode } from "./env";

export type AdminIdentity = {
  email: string;
  appMetadata: Record<string, unknown>;
};

export function getAdminAllowlist(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminIdentity(
  identity: AdminIdentity,
  allowlist = getAdminAllowlist(),
): boolean {
  return (
    identity.appMetadata.role === "admin" ||
    allowlist.includes(identity.email.toLowerCase())
  );
}

export async function getAdminIdentity(): Promise<AdminIdentity | null> {
  if (isDemoMode()) {
    return {
      email: "demo@wedding.local",
      appMetadata: { role: "admin", demo: true },
    };
  }

  const { createSupabaseServerClient } = await import("@/lib/supabase/server");
  const client = await createSupabaseServerClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user?.email) return null;
  const identity = {
    email: user.email,
    appMetadata: user.app_metadata,
  };
  return isAdminIdentity(identity) ? identity : null;
}
