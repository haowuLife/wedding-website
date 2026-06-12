import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

export const galleryCookieName = "wedding_gallery_session";

export function createAccessCodeHash(
  code: string,
  salt = randomBytes(16).toString("hex"),
): string {
  const digest = scryptSync(code, salt, 32).toString("hex");
  return `scrypt:${salt}:${digest}`;
}

export function verifyAccessCode(code: string, storedHash: string): boolean {
  const [algorithm, salt, expectedHex] = storedHash.split(":");
  if (algorithm !== "scrypt" || !salt || !expectedHex) return false;
  const actual = scryptSync(code, salt, 32);
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createGallerySession(
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
  ttlSeconds = 60 * 60 * 12,
): string {
  const expiresAt = nowSeconds + ttlSeconds;
  const signature = createHmac("sha256", secret)
    .update(String(expiresAt))
    .digest("hex");
  return `${expiresAt}.${signature}`;
}

export function verifyGallerySession(
  session: string | undefined,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): boolean {
  if (!session) return false;
  const [expiresValue, signatureHex] = session.split(".");
  const expiresAt = Number(expiresValue);
  if (!Number.isFinite(expiresAt) || expiresAt < nowSeconds || !signatureHex) {
    return false;
  }
  const expected = createHmac("sha256", secret)
    .update(String(expiresAt))
    .digest();
  const actual = Buffer.from(signatureHex, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
