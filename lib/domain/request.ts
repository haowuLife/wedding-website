import { NextRequest } from "next/server";

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost ?? request.headers.get("host");
    const forwardedProtocol = request.headers.get("x-forwarded-proto");
    const protocol =
      forwardedProtocol ?? new URL(request.url).protocol.replace(":", "");
    const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
      : null;

    return (
      originUrl.origin === configuredOrigin ||
      (originUrl.host === host && originUrl.protocol === `${protocol}:`)
    );
  } catch {
    return false;
  }
}

export function validationError(
  issues: Array<{ path: PropertyKey[]; message: string }>,
) {
  const fields = Object.fromEntries(
    issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
  );
  return Response.json(
    { ok: false, error: "请检查表单内容", fields },
    { status: 400 },
  );
}
