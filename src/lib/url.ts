import { NextRequest } from "next/server";

/**
 * Returns the public-facing origin (scheme + host) for building absolute
 * redirect URLs in Next.js Route Handlers.
 *
 * Priority:
 *   1. process.env.APP_URL          — set this in Replit Deployment secrets
 *   2. x-forwarded-host / x-forwarded-proto headers injected by the proxy
 *   3. request.url origin           — correct in local dev (localhost)
 */
export function getPublicOrigin(request: NextRequest): string {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, "");
  }

  const fwdHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const fwdProto = request.headers.get("x-forwarded-proto") || "https";

  if (fwdHost && !fwdHost.startsWith("0.0.0.0") && !fwdHost.startsWith("localhost")) {
    return `${fwdProto}://${fwdHost}`;
  }

  return new URL(request.url).origin;
}

/**
 * Builds an absolute URL for a path using the public-facing origin.
 */
export function publicUrl(request: NextRequest, path: string): URL {
  return new URL(path, getPublicOrigin(request));
}
