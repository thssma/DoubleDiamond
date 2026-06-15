import { AuthContext, requireOwner, requireStaff } from "./auth.ts";
import { jsonResponse } from "./cors.ts";
import { optionalEnv, requiredEnv } from "./env.ts";

type BackendPayload = {
  table?: string;
  action?: string;
  payload?: Record<string, unknown>;
  source?: string;
};

const BACKEND_ONLY_TABLES = new Set([
  "integration_credentials",
  "integration_execution_queue",
  "integration_webhooks",
  "whatsapp_message_queue",
  "gmail_message_queue",
  "push_notification_queue",
  "automation_flow_runs",
  "ai_command_center_logs"
]);

function assertBackendTable(table: string): Response | null {
  if (BACKEND_ONLY_TABLES.has(table)) return null;
  return jsonResponse({ error: `Unsupported backend table: ${table}` }, 400);
}

function success(table: string, action: string, provider: string, extra: Record<string, unknown> = {}): Response {
  return jsonResponse({
    ok: true,
    table,
    action,
    provider,
    status: "accepted",
    ...extra
  }, 202);
}

export async function readPayload(request: Request): Promise<BackendPayload | Response> {
  try {
    return await request.json();
  } catch (_error) {
    return jsonResponse({ error: "Invalid JSON payload" }, 400);
  }
}

export async function dispatchBackendOperation(context: AuthContext, body: BackendPayload): Promise<Response> {
  const table = String(body.table || "");
  const action = String(body.action || "");
  const payload = (body.payload || {}) as Record<string, unknown>;

  const tableError = assertBackendTable(table);
  if (tableError) return tableError;

  if (["integration_credentials", "integration_webhooks"].includes(table)) {
    const ownerError = requireOwner(context);
    if (ownerError) return ownerError;
  } else {
    const staffError = requireStaff(context);
    if (staffError) return staffError;
  }

  if (table === "whatsapp_message_queue") {
    requiredEnv("META_WHATSAPP_TOKEN");
    requiredEnv("META_WHATSAPP_PHONE_NUMBER_ID");
    return success(table, action, "meta-whatsapp", { mode: optionalEnv("BACKEND_MODE") || "configured" });
  }

  if (table === "gmail_message_queue") {
    requiredEnv("GOOGLE_CLIENT_ID");
    requiredEnv("GOOGLE_CLIENT_SECRET");
    requiredEnv("GOOGLE_REFRESH_TOKEN");
    return success(table, action, "gmail", { mode: optionalEnv("BACKEND_MODE") || "configured" });
  }

  if (table === "push_notification_queue") {
    requiredEnv("PUSH_PROVIDER_SECRET");
    return success(table, action, "push-provider", { mode: optionalEnv("BACKEND_MODE") || "configured" });
  }

  if (table === "ai_command_center_logs") {
    requiredEnv("OPENAI_API_KEY");
    return success(table, action, "openai", { mode: optionalEnv("BACKEND_MODE") || "configured" });
  }

  if (table === "automation_flow_runs") {
    return success(table, action, "automation-runner", { mode: optionalEnv("BACKEND_MODE") || "configured" });
  }

  return success(table, action, "supabase-edge-function", {
    company_id: context.companyId,
    received_payload: Object.keys(payload)
  });
}
