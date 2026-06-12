import { createHmac } from "node:crypto";

import { isDemoMode } from "./env";

const demoRateLimits = new Map<
  string,
  { count: number; expiresAt: number }
>();

export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function hashClientIp(ip: string): string {
  const secret = process.env.RATE_LIMIT_SECRET || "demo-rate-limit-secret";
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export async function consumeRateLimit(
  scope: string,
  ipHash: string,
  limit = 5,
  windowSeconds = 600,
): Promise<boolean> {
  if (isDemoMode()) {
    const key = `${scope}:${ipHash}`;
    const now = Date.now();
    const current = demoRateLimits.get(key);
    if (!current || current.expiresAt <= now) {
      demoRateLimits.set(key, {
        count: 1,
        expiresAt: now + windowSeconds * 1000,
      });
      return true;
    }
    if (current.count >= limit) return false;
    current.count += 1;
    return true;
  }

  const { createSupabaseAdminClient } = await import("@/lib/supabase/admin");
  const client = createSupabaseAdminClient();
  const { data, error } = await client.rpc("consume_form_rate_limit", {
    p_scope: scope,
    p_ip_hash: ipHash,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });
  if (error) throw new Error(error.message);
  return Boolean(data);
}
