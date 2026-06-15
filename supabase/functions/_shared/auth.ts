import { jsonResponse } from "./cors.ts";

export type BackendRole = "owner" | "employee" | "client";

export type AuthContext = {
  userId: string;
  role: BackendRole;
  companyId: string;
};

function parseJwtPayload(token: string): Record<string, unknown> {
  const parts = token.split(".");
  if (parts.length < 2) return {};
  try {
    const normalized = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch (_error) {
    return {};
  }
}

export function getAuthContext(request: Request): AuthContext | Response {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  if (!token) return jsonResponse({ error: "Missing authorization bearer token" }, 401);

  const payload = parseJwtPayload(token);
  const appMetadata = (payload.app_metadata || {}) as Record<string, unknown>;
  const userMetadata = (payload.user_metadata || {}) as Record<string, unknown>;
  const role = String(appMetadata.role || userMetadata.role || "client") as BackendRole;
  const companyId = String(appMetadata.company_id || userMetadata.company_id || "");
  const userId = String(payload.sub || "");

  if (!userId) return jsonResponse({ error: "Invalid auth token" }, 401);
  if (!companyId) return jsonResponse({ error: "Missing company_id in auth metadata" }, 403);
  if (!["owner", "employee", "client"].includes(role)) return jsonResponse({ error: "Invalid role" }, 403);

  return { userId, role, companyId };
}

export function requireStaff(context: AuthContext): Response | null {
  if (context.role === "owner" || context.role === "employee") return null;
  return jsonResponse({ error: "Staff role required" }, 403);
}

export function requireOwner(context: AuthContext): Response | null {
  if (context.role === "owner") return null;
  return jsonResponse({ error: "Owner role required" }, 403);
}
